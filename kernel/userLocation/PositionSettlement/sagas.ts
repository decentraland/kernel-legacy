import { parseParcelPosition } from '@dcl/utils'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { SceneLifeCycleState } from '~/kernel/scene-runner/types'
import { SCENE_RUNNING, SCENE_SCRIPT_SOURCED_FATAL_ERROR } from '../../scene-runner/actions'
import { getSightedScenesRunningReport, isSceneAtPositionRendereable } from '../../scene-runner/selectors'
import { setPosition, SET_POSITION } from '../ParcelSight/actions'
import { settlePosition, TeleportAction, unsettlePosition } from './actions'
import { isPositionSettled } from './selectors'
import { TELEPORT } from './types'

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
  const currentSceneStatus: SceneLifeCycleState = yield select(getSightedScenesRunningReport)
  const sighted = Object.keys(currentSceneStatus)
  if (!sighted.length) {
    return false
  }
  for (let sceneId of sighted) {
    if (currentSceneStatus[sceneId] !== 'running' && currentSceneStatus[sceneId] !== 'error') {
      return false
    }
  }
  return true
}

export function* handleTeleport(action: TeleportAction): any {
  const isRendereable: string = yield select(isSceneAtPositionRendereable, action.payload.position)
  if (isRendereable) {
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
