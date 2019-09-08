import { fork } from 'redux-saga/effects'
import { positionSettlementSaga } from './userLocation/PositionSettlement/sagas'
import { positionToSceneIdSaga } from './loader/PositionToSceneId/sagas'
import { sceneIdToManifestSaga } from './loader/SceneIdToSceneManifest/sagas'
import { rootSceneLifecycleSaga } from './scene-runner/sagas'
import { authSaga } from './auth/sagas'
import { commsSaga } from './comms/sagas'
import { profileResolverSaga } from './passports/sagas'

export function* rootSaga() {
  yield fork(authSaga)
  yield fork(commsSaga)
  yield fork(rootSceneLifecycleSaga)
  yield fork(sceneIdToManifestSaga)
  yield fork(positionToSceneIdSaga)
  yield fork(positionSettlementSaga)
  yield fork(profileResolverSaga)
}
