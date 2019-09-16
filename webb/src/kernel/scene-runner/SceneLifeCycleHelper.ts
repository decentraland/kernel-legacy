import { encodeParcelPosition, encodeParcelPositionFromCoordinates, ISceneManifest, Vector2 } from '@dcl/utils'
import { EventEmitter } from 'events'
import future from 'fp-future'
import { Store } from 'redux'
import { RootParcelLoadingState } from '../loader/ParcelLoading/types'
import { positionLoadRequest } from '../loader/PositionToSceneId/actions'
import { getEmptyStatus, getPositionError, getSceneIdForPosition } from '../loader/PositionToSceneId/selectors'
import { RootPositionToSceneIdState } from '../loader/PositionToSceneId/types'
import { getSceneError, getSceneManifest } from '../loader/SceneIdToSceneManifest/selectors'
import { RootSceneIdToSceneManifestState, sceneByIdRequest } from '../loader/SceneIdToSceneManifest/types'
import { RootParcelSightState } from '../userLocation/ParcelSight/types'
import { teleport } from '../userLocation/PositionSettlement/actions'
import { RootPositionSettlementState } from '../userLocation/PositionSettlement/types'
import { RootSceneLifeCycleState } from './types'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionSettlementState &
  RootPositionToSceneIdState &
  RootSceneIdToSceneManifestState &
  RootSceneLifeCycleState

export class SceneLifeCycleHelper extends EventEmitter {
  store: Store<RootState>

  async getSceneForCoordinates(x: number, y: number): Promise<ISceneManifest> {
    const sceneId = await this.getSceneIdByCoordinates(x, y)
    return this.getSceneById(sceneId)
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
    this.store.dispatch(positionLoadRequest([position]))
    return promise
  }
}
