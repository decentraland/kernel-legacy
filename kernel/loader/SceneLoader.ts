import { EventEmitter } from 'events'
import future from 'fp-future'
import { combineReducers, createStore, Store } from 'redux'

import { encodeParcelPositionFromCoordinates, ISceneManifest, Vector2, encodeParcelPosition } from '@dcl/utils'

import { ParcelLoadingActionType } from './ParcelLoading/actions'
import { parcelLoadingReducer as parcelLoading } from './ParcelLoading/reducer'
import { RootParcelLoadingState } from './ParcelLoading/types'
import { configureLineOfSightRadius, ParcelSightAction, setPosition } from './ParcelSight/actions'
import { parcelSightReducer as parcelSight } from './ParcelSight/reducer'
import { RootParcelSightState } from './ParcelSight/types'
import { PositionSettlementAction, teleport } from './PositionSettlement/actions'
import { positionSettlementReducer as positionSettlement } from './PositionSettlement/reducer'
import { RootPositionSettlementState } from './PositionSettlement/types'
import {
  configureDownloadServer as configureSceneIdServer,
  positionLoadingRequest,
  PositionToSceneIdAction
} from './PositionToSceneId/actions'
import { positionToSceneIdReducer as positionToSceneId } from './PositionToSceneId/reducer'
import { getEmptyStatus, getPositionError, getSceneIdForPosition } from './PositionToSceneId/selectors'
import { RootPositionToSceneIdState } from './PositionToSceneId/types'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from './SceneIdToSceneManifest/reducer'
import { getSceneError, getSceneManifest } from './SceneIdToSceneManifest/selectors'
import {
  configureDownloadServer as configureManifestServer,
  RootSceneIdToSceneManifestState,
  SceneByIdAction,
  sceneByIdRequest
} from './SceneIdToSceneManifest/types'
import { sceneLifeCycleReducer as sceneLifeCycle } from './SceneLifeCycle/reducer'
import { RootSceneLifeCyleState, SceneLifeCycleAction } from './SceneLifeCycle/types'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionSettlementState &
  RootPositionToSceneIdState &
  RootSceneIdToSceneManifestState &
  RootSceneLifeCyleState

export type RootAction =
  | ParcelLoadingActionType
  | ParcelSightAction
  | PositionToSceneIdAction
  | PositionSettlementAction
  | SceneByIdAction
  | SceneLifeCycleAction

export class SceneLoader extends EventEmitter {
  store: Store<RootState>
  setup(downloadServer: string, lineOfSight: number) {
    const store = (this.store = createStore(
      combineReducers({
        parcelLoading,
        parcelSight,
        positionSettlement,
        positionToSceneId,
        sceneIdToManifest,
        sceneLifeCycle
      })
    ))
    store.dispatch(configureLineOfSightRadius(lineOfSight))
    store.dispatch(configureSceneIdServer(downloadServer))
    store.dispatch(configureManifestServer(downloadServer))
  }

  async getSceneForCoordinates(x: number, y: number): Promise<ISceneManifest> {
    const sceneId = await this.getSceneIdByCoordinates(x, y)
    return this.getSceneById(sceneId)
  }

  reportCurrentPosition(position: Vector2) {
    this.store.dispatch(setPosition(position))
  }

  teleport(position: Vector2) {
    this.store.dispatch(teleport(encodeParcelPosition(position)))
  }

  protected getSceneById(sceneId: string): Promise<ISceneManifest> {
    const resolved = getSceneManifest(this.store.getState(), sceneId)
    if (resolved) {
      return Promise.resolve(resolved)
    }
    const promise = future<ISceneManifest>()
    const unsubscribe = this.store.subscribe(() => {
      const sceneManifest = getSceneManifest(this.store.getState(), sceneId)
      const sceneError = getSceneError(this.store.getState(), sceneId)
      if (sceneManifest || sceneError) {
        if (sceneManifest) {
          promise.resolve(sceneManifest)
        } else if (sceneError) {
          promise.reject(sceneError)
        }
        unsubscribe()
      }
    })
    this.store.dispatch(sceneByIdRequest(sceneId))
    return promise
  }

  protected getSceneIdByCoordinates(x: number, y: number): Promise<string> {
    const position = encodeParcelPositionFromCoordinates(x, y)
    const resolved = getSceneIdForPosition(this.store.getState(), position)
    if (resolved) {
      return Promise.resolve(resolved)
    }
    const promise = future<string>()
    const unsubscribe = this.store.subscribe(() => {
      const sceneId = getSceneIdForPosition(this.store.getState(), position)
      const idError = getPositionError(this.store.getState(), position)
      const emptyStatus = getEmptyStatus(this.store.getState(), position)
      if (sceneId || idError || emptyStatus) {
        if (sceneId) {
          promise.resolve(sceneId)
        } else if (idError) {
          promise.reject(new Error(`Invalid response for ${position}`))
        } else if (emptyStatus) {
          promise.resolve(undefined)
        }
        unsubscribe()
      }
    })
    this.store.dispatch(positionLoadingRequest([position]))
    return promise
  }
}
