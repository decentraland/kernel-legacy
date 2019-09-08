import { takeLatest } from 'redux-saga/effects'
import { SCENE_BY_ID_SUCCESS, SceneByIdSuccess } from '../loader/SceneIdToSceneManifest/types'
import { SET_POSITION } from '../userLocation/ParcelSight/actions'
import { UNSETTLE_POSITION } from '../userLocation/PositionSettlement/types'

export function* rootSceneLifecycleSaga(): any {
  yield takeLatest(SCENE_BY_ID_SUCCESS, evaluateStartScene)
  yield takeLatest(SET_POSITION, evaluateStartScenesAroundNewPosition)
  yield takeLatest(SET_POSITION, evaluateUnloadScenes)
  yield takeLatest(UNSETTLE_POSITION, evaluateUnloadScenes)
}

function* evaluateStartScene(action: SceneByIdSuccess) {}
function* evaluateStartScenesAroundNewPosition(action: SceneByIdSuccess) {}
function* evaluateUnloadScenes(action: SceneByIdSuccess) {}
