import { all, put, select, takeLatest, call } from 'redux-saga/effects'
import { parseParcelPosition } from '@dcl/utils'

import { setPosition } from '../ParcelSight/actions'
import { getAwakeScenes, getLoadingScenes, getStartingScenes } from '../SceneLifeCycle/selectors'
import { SCENE_RUNNING } from '../SceneLifeCycle/types'
import { TELEPORT, TeleportAction, settlePosition } from './actions'

export function* positionSettlementSaga() {
  yield takeLatest(TELEPORT, handleTeleport)
  yield takeLatest(SCENE_RUNNING, handleRunningScene)
}

export function* canPositionSettle() {
  const pending = yield all({
    loading: select(getLoadingScenes),
    awake: select(getAwakeScenes),
    started: select(getStartingScenes)
  })
  if (pending.loading.length || pending.awake.length || pending.started.length) {
    return false
  }
}

export function* handleTeleport(action: TeleportAction) {
  const positionAsVector = parseParcelPosition(action.payload.position)
  yield put(setPosition(positionAsVector))
}

export function* handleRunningScene() {
  const canSettle = yield call(canPositionSettle)
  if (canSettle) {
    yield put(settlePosition())
  }
}
