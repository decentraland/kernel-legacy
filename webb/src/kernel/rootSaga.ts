import { fork } from 'redux-saga/effects'
import { positionSettlementSaga } from './loader/PositionSettlement/sagas'
import { positionToSceneIdSaga } from './loader/PositionToSceneId/sagas'
import { sceneIdToManifestSaga } from './loader/SceneIdToSceneManifest/sagas'
import { rootSceneLifecycleSaga } from './loader/SceneLifeCycle/sagas'
import { rootParcelSight } from './loader/ParcelSight/sagas'
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
  yield fork(rootParcelSight)
  yield fork(profileResolverSaga)
}
