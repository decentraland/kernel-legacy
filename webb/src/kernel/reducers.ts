import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { AnyAction, combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { commsReducer } from './comms/reducer'
import { ParcelLoadingActionType } from './loader/ParcelLoading/actions'
import { parcelLoadingReducer as parcelLoading } from './loader/ParcelLoading/reducer'
import { RootParcelLoadingState } from './loader/ParcelLoading/types'
import { PositionToSceneIdAction } from './loader/PositionToSceneId/actions'
import { positionToSceneIdReducer as positionToSceneId } from './loader/PositionToSceneId/reducer'
import { RootPositionToSceneIdState } from './loader/PositionToSceneId/types'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from './loader/SceneIdToSceneManifest/reducer'
import { RootSceneIdToSceneManifestState, SceneByIdAction } from './loader/SceneIdToSceneManifest/types'
import { passportsReducer } from './passports/reducer'
import { RootSceneLifeCycleState, SceneLifeCycleAction } from './scene-runner/types'
import { sceneLifeCycleReducer as sceneLifeCycle } from './scene-runner/reducer'
import { ParcelSightAction } from './userLocation/ParcelSight/actions'
import { parcelSightReducer as parcelSight } from './userLocation/ParcelSight/reducer'
import { RootParcelSightState } from './userLocation/ParcelSight/types'
import { PositionSettlementAction } from './userLocation/PositionSettlement/actions'
import { positionSettlementReducer as positionSettlement } from './userLocation/PositionSettlement/reducer'
import { RootPositionSettlementState } from './userLocation/PositionSettlement/types'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionSettlementState &
  RootPositionToSceneIdState &
  RootSceneIdToSceneManifestState &
  RootSceneLifeCycleState

export type RootAction =
  | ParcelLoadingActionType
  | ParcelSightAction
  | PositionToSceneIdAction
  | PositionSettlementAction
  | SceneByIdAction
  | SceneLifeCycleAction

export const createReducer: any = (history: History) => {
  return combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState,
    auth: authReducer,
    comms: commsReducer,
    parcelLoading,
    parcelSight,
    positionSettlement,
    positionToSceneId,
    sceneIdToManifest,
    sceneLifeCycle,
    passports: passportsReducer
  })
}
