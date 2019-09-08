import { ISceneManifest } from '@dcl/utils'
import future from 'fp-future'
import { all, call, fork, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { getSceneManifest } from '../loader/SceneIdToSceneManifest/selectors'
import { SCENE_BY_ID_SUCCESS } from '../loader/SceneIdToSceneManifest/types'
import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'
import { SceneWorkersManager } from '../scene-scripts/SceneWorkersManager'
import { PARCEL_SIGHT_DELTA } from '../userLocation/ParcelSight/actions'
import { reportSceneSightDelta, sceneLoading, SCENE_SIGHT_DELTA, SCENE_STOP, stopScene } from './actions'
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
    yield put(reportSceneSightDelta({ updatedSightCount, newlySeenScenes, lostSightScenes }))
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
    let scene
    if (typeof input === 'string') {
      scene = yield select(getSceneManifest, sceneId)
      if (!scene) {
        return
      }
    } else {
      scene = input
    }
    yield put(sceneLoading(scene.id))
    const worker = sceneManager.loadScene(scene)
    const result = yield fork(function* racer() {
      yield race({
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
  yield all(action.payload.newlySeenScenes.map(sceneId => fork(() => sceneRunner(sceneId))))
}
function* evaluateUnloadScenes(action: SceneSightDeltaAction) {
  yield all(action.payload.lostSightScenes.map(sceneId => put(stopScene(sceneId))))
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
