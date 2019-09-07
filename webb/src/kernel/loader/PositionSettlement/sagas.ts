import { call, put, select, takeLatest } from 'redux-saga/effects'
import { SET_POSITION, setPosition } from '../ParcelSight/actions'
import { allInSight } from '../ParcelSight/selectors'
import { getSceneLifeCycle, getSceneStatusByPosition } from '../SceneLifeCycle/selectors'
import { SceneLifeCycleState, SCENE_RUNNING, SCENE_SCRIPT_SOURCED_FATAL_ERROR } from '../SceneLifeCycle/types'
import { TELEPORT } from './types'
import { settlePosition, TeleportAction, unsettlePosition } from './actions'
import { isPositionSettled } from './selectors'

export function* positionSettlementSaga(): any {
  yield takeLatest(TELEPORT, handleTeleport)
  yield takeLatest(SET_POSITION, tryToSettle)
  yield takeLatest(SCENE_RUNNING, tryToSettle)
  yield takeLatest(SCENE_SCRIPT_SOURCED_FATAL_ERROR, tryToSettle)
}

export function* tryToSettle(): any {
  const hasSettled = yield select(isPositionSettled)
  if (!hasSettled) {
    if (yield call(canPositionSettle)) {
      yield put(settlePosition())
    }
  }
}

export function* canPositionSettle(): any {
  const allSighted: string[] = yield select(allInSight)
  const currentSceneStatus: SceneLifeCycleState = yield select(getSceneLifeCycle)
  for (let position of allSighted) {
    if (!currentSceneStatus.running[position] && !currentSceneStatus.error[position]) {
      return false
    }
  }
  return true
}

export function* handleTeleport(action: TeleportAction): any {
  const status: string = yield select(getSceneStatusByPosition, action.payload.position)
  if (status !== 'running' && status !== 'error') {
    yield put(unsettlePosition())
  }
}
