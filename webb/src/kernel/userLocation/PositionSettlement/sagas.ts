import { parseParcelPosition } from '@dcl/utils'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { SET_POSITION, setPosition } from '../ParcelSight/actions'
import { allInSight } from '../ParcelSight/selectors'
import { TELEPORT } from './types'
import { settlePosition, TeleportAction, unsettlePosition } from './actions'
import { isPositionSettled } from './selectors'
import { SCENE_RUNNING, SCENE_SCRIPT_SOURCED_FATAL_ERROR, SceneLifeCycleState } from '~/kernel/scene-runner/types'
import { getSceneLifeCycle, getSceneStatusByPosition } from '~/kernel/scene-runner/selectors'

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
  if (status === 'running' || status === 'error') {
    // What should we do here? We are teleporting to a scene that already loaded.
    //  - Nothing? Business as usual, similar to moving from one parcel to the other.
    //      This means waiting for other side-effects watchers to realize.
    //  - Should this trigger the selection of a spawnpoint?
    //      This sounds like something with more awareness of how scenes work should do it
  } else {
    // What should we do here? We are teleporting to a loading scene.
    if (yield select(isPositionSettled)) {
      yield put(unsettlePosition())
    }
  }
  yield put(setPosition(parseParcelPosition(action.payload.position)))
}
