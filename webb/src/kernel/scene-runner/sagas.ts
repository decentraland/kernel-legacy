import future from 'fp-future'
import { ISceneManifest } from '@dcl/utils'
import { call, put, race, select, takeLatest, fork, take } from 'redux-saga/effects'
import { SceneByIdSuccess, SCENE_BY_ID_SUCCESS } from '../loader/SceneIdToSceneManifest/types'
import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'
import { SceneWorkersManager } from '../scene-scripts/SceneWorkersManager'
import { SET_POSITION } from '../userLocation/ParcelSight/actions'
import { isAnyParcelInSight } from '../userLocation/ParcelSight/selectors'
import { UNSETTLE_POSITION } from '../userLocation/PositionSettlement/types'
import { shouldTriggerLoading } from './selectors'
import { sceneLoading, SCENE_STOP, StopScene } from './types'

export function* rootSceneLifecycleSaga(): any {
  yield takeLatest(SCENE_BY_ID_SUCCESS, evaluateStartScene)
  yield takeLatest(SET_POSITION, evaluateStartScenesAroundNewPosition)
  yield takeLatest(SET_POSITION, evaluateUnloadScenes)
  yield takeLatest(UNSETTLE_POSITION, evaluateUnloadScenes)
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

function* evaluateStartScenesAroundNewPosition(action: SceneByIdSuccess) {}
function* evaluateUnloadScenes(action: SceneByIdSuccess) {}

async function watchForSceneDispose(sceneId: string, worker: ISceneWorker) {
  const stop = future<void>()
  worker.onDisposeObservable.addOnce((eventType: any, eventState: any) => {
    console.log(eventState, eventType)
    stop.resolve()
  })
  await stop
  return sceneId
}
