import { ISceneManifest } from '@dcl/utils'
import future from 'fp-future'
import { call, delay, put, race, select, spawn, take, takeLatest } from 'redux-saga/effects'
import { getSceneManifest } from '../loader/SceneIdToSceneManifest/selectors'
import { SCENE_BY_ID_SUCCESS } from '../loader/SceneIdToSceneManifest/types'
import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'
import { SceneWorkersManager } from '../scene-scripts/SceneWorkersManager'
import { PARCEL_SIGHT_DELTA } from '../userLocation/ParcelSight/actions'
import {
  rendererSentLoaded,
  reportSceneSightDelta,
  sceneLoading,
  sceneRendererError,
  sceneRunning,
  SCENE_SIGHT_DELTA,
  SCENE_STOP,
  scriptSentAwake,
  scriptTimedout,
  stopScene
} from './actions'
import { getSceneDeltaPositionReport, shouldTriggerLoading } from './selectors'
import { SceneSightDeltaAction, StopScene } from './types'

export function* rootSceneLifecycleSaga(): any {
  yield takeLatest(SCENE_BY_ID_SUCCESS, triggerSceneSightDelta)
  yield takeLatest(PARCEL_SIGHT_DELTA, triggerSceneSightDelta)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateStartScenesAroundNewPosition)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateUnloadScenes)
}

function* triggerSceneSightDelta() {
  const { updatedSightCount, newlySeenScenes, lostSightScenes } = yield select(getSceneDeltaPositionReport)
  if (newlySeenScenes.length || lostSightScenes.length) {
    const sceneReport = reportSceneSightDelta({ updatedSightCount, newlySeenScenes, lostSightScenes }))
    debugger
    yield put(sceneReport)
  }
}

export const sceneManager = new SceneWorkersManager()

function* sceneRunner(input: string | ISceneManifest) {
  if (!input) {
    return
  }
  const sceneId = typeof input === 'string' ? input : input.id
  const shouldtrigger = yield select(shouldTriggerLoading, sceneId)
  if (shouldtrigger) {
    yield put(sceneLoading(sceneId))
    let scene
    if (typeof input === 'string') {
      scene = yield select(getSceneManifest, sceneId)
      if (!scene) {
        const resolve = yield take(action => action.type === SCENE_BY_ID_SUCCESS && action.payload.sceneId === sceneId)
        scene = resolve.payload.scene
      }
    } else {
      scene = input
    }
    return yield spawn(function* racer() {
      const worker = yield call(() => sceneManager.loadScene(scene))
      const scriptLoad: any = yield race({
        awake: call(watchScriptForAwake, worker),
        timeout: delay(10000)
      })
      if (scriptLoad.awake) {
        yield put(scriptSentAwake(scene.id))
      } else {
        yield put(scriptTimedout(scene.id))
        worker.dispose()
        return
      }
      const rendererLoad: any = yield race({
        load: call(watchRendererForLoaded, worker),
        timeout: delay(10000)
      })
      if (rendererLoad.load) {
        yield put(rendererSentLoaded(scene.id))
      } else {
        console.log('Scene rendering took too long', scene)
        yield put(sceneRendererError(scene.id))
        worker.dispose()
        return
      }
      yield put(sceneRunning(scene.id))
      const result = yield race({
        sceneError: call(watchForSceneDispose, scene.id, worker),
        stop: take(
          (action: any) => action && action.type === SCENE_STOP && (action as StopScene).payload.sceneId === scene.id
        )
      })
      if (result.stop) {
        worker.dispose()
      }
    })
  }
}

function* evaluateStartScenesAroundNewPosition(action: SceneSightDeltaAction) {
  for (let scene of action.payload.newlySeenScenes) {
    yield spawn(sceneRunner, scene)
  }
}
function* evaluateUnloadScenes(action: SceneSightDeltaAction) {
  for (let sceneId of action.payload.lostSightScenes) {
    yield put(stopScene(sceneId))
  }
}

async function watchScriptForAwake(worker: ISceneWorker) {
  const awake = future<boolean>()
  const system = await (worker as any).system
  system.on('awake', () => {
    console.log(worker.sceneManifest.id, 'awake')
    awake.resolve(true)
  })
  return awake
}

async function watchRendererForLoaded(worker: ISceneWorker) {
  const loaded = future<boolean>()
  const system = await (worker as any).system
  system.on('loaded', () => {
    console.log(worker.sceneManifest.id, 'loaded')
    loaded.resolve(true)
  })
  return loaded
}

async function watchForSceneDispose(sceneId: string, worker: ISceneWorker) {
  const stop = future<void>()
  worker.onDisposeObservable.addOnce((eventType: any, eventState: any) => {
    console.log(eventState, eventType)
    stop.resolve()
  })
  await stop
  return sceneId
}
