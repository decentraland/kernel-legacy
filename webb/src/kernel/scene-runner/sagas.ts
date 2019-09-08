import { ISceneManifest } from '@dcl/utils'
import future from 'fp-future'
import { call, fork, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { getSceneManifest } from '../loader/SceneIdToSceneManifest/selectors'
import { SceneByIdSuccess, SCENE_BY_ID_SUCCESS } from '../loader/SceneIdToSceneManifest/types'
import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'
import { SceneWorkersManager } from '../scene-scripts/SceneWorkersManager'
import { ParcelSightChangedAction, PARCEL_SIGHT_DELTA } from '../userLocation/ParcelSight/actions'
import { isAnyParcelInSight } from '../userLocation/ParcelSight/selectors'
import { reportSceneSightDelta, sceneLoading, SCENE_SIGHT_DELTA, SCENE_STOP, stopScene } from './actions'
import { getSceneDeltaPositionReport, shouldTriggerLoading } from './selectors'
import { StopScene } from './types'

export function* rootSceneLifecycleSaga(): any {
  yield takeLatest(SCENE_BY_ID_SUCCESS, evaluateStartScene)
  yield takeLatest(PARCEL_SIGHT_DELTA, triggerSceneSightDelta)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateStartScenesAroundNewPosition)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateUnloadScenes)
}

function* triggerSceneSightDelta() {
  const { updatedSightCount, newlySeenScenes, lostSightScenes } = yield select(getSceneDeltaPositionReport)
  yield put(reportSceneSightDelta({ updatedSightCount, newlySeenScenes, lostSightScenes }))
}

export const sceneManager = new SceneWorkersManager()

function* evaluateStartScene(action: SceneByIdSuccess) {
  const { scene } = action.payload
  const inSight = yield select(isAnyParcelInSight, scene.parcels)
  if (!inSight) {
    return
  }
  yield fork(sceneRunner, scene)
}

function* sceneRunner(scene: ISceneManifest) {
  const shouldtrigger = yield select(shouldTriggerLoading, scene.id)
  if (shouldtrigger) {
    yield put(sceneLoading(scene.id))
    const worker = sceneManager.loadScene(scene)
    yield race({
      sceneError: call(watchForSceneDispose, scene.id, worker),
      stop: take(
        (action: any) => action && action.type === SCENE_STOP && (action as StopScene).payload.sceneId === scene.id
      )
    })
  }
}

function* evaluateStartScenesAroundNewPosition(action: ParcelSightChangedAction) {
  for (let sceneId in action.payload.sighted) {
    if (yield select(shouldTriggerLoading, sceneId)) {
      const scene = yield select(getSceneManifest, sceneId)
      yield fork(sceneRunner, scene)
    }
  }
}
function* evaluateUnloadScenes(action: ParcelSightChangedAction) {
  for (let sceneId in action.payload.lostSight) {
    yield put(stopScene(sceneId))
  }
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
