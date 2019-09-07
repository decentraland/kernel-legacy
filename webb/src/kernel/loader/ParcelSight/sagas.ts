import { takeLatest, put } from 'redux-saga/effects'
import { setPosition } from './actions'
import { TELEPORT } from '../PositionSettlement/types'
import { TeleportAction } from '../PositionSettlement/actions'

export function* rootParcelSight() {
  yield takeLatest(TELEPORT, handleTeleport)
}

export function* handleTeleport(action: TeleportAction) {
  const [x, y] = action.payload.position.split(',').map(_ => parseInt(_, 10))
  yield put(setPosition({ x, y }))
}
