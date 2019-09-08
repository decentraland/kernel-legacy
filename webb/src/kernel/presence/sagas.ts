import { select, takeLatest } from 'redux-saga/effects'
import {
  ProtocolPingAction,
  PROTOCOL_CHAT,
  PROTOCOL_PING,
  PROTOCOL_POSITION,
  PROTOCOL_PROFILE,
  PROTOCOL_SCENE
} from '../comms/actions'
import { SET_POSITION } from '../userLocation/ParcelSight/actions'
import { allInSight } from '../userLocation/ParcelSight/selectors'
import { SETTLE_POSITION, UNSETTLE_POSITION } from '../userLocation/PositionSettlement/types'

export function* presenceSaga() {
  yield takeLatest(PROTOCOL_PING, handleIncomingPing)
  yield takeLatest(PROTOCOL_PROFILE, handleIncomingPing)
  yield takeLatest(PROTOCOL_CHAT, handleIncomingPing)
  yield takeLatest(PROTOCOL_POSITION, handleIncomingPing)
  yield takeLatest(PROTOCOL_SCENE, handleIncomingPing)

  yield takeLatest(SETTLE_POSITION, subscribeAround)
  yield takeLatest(UNSETTLE_POSITION, handleNeedToUnsubscribe)
  yield takeLatest(SET_POSITION, subscribeAround)

  yield takeLatest(SETTLE_POSITION, subscribeAround)
  yield takeLatest(UNSETTLE_POSITION, handleNeedToUnsubscribe)
  yield takeLatest(SET_POSITION, subscribeAround)
}

function* handleIncomingPing(ping: ProtocolPingAction) {
  console.log(ping.payload.ping)
}

function* subscribeAround() {
  const { delta, currentlySighted } = yield select(allInSight)
}

function* handleNeedToUnsubscribe() {}
