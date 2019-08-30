import { Observable } from '@dcl/utils'
import { EventEmitter } from 'events'
import { ILand } from '@dcl/utils'
import { SceneLifeCycleStatus } from './SceneLifeCycleStatus'
import { PositionToSceneId } from './requests/PositionToSceneId'
import { SceneDataDownloadManager } from './requests/SceneDataDownloadManager'
import { SceneIdToData } from './requests/SceneIdToData'

export type SceneLifeCycleStatusReport = { sceneId: string; status: SceneLifeCycleStatus }

export const sceneLifeCycleObservable = new Observable<Readonly<SceneLifeCycleStatusReport>>()

export class SceneLifeCycleController extends EventEmitter {
  positionToSceneId: PositionToSceneId
  sceneIdToData: SceneIdToData

  // Position to Status
  private positionToStatus = new Map<string, SceneLifeCycleStatus>()
  private sceneIdToStatus = new Map<string, SceneLifeCycleStatus>()

  constructor(downloadManager: SceneDataDownloadManager) {
    super()
    this.positionToSceneId = new PositionToSceneId(downloadManager)
    this.sceneIdToData = new SceneIdToData(downloadManager, this.positionToSceneId)
  }

  reportSceneStarted(sceneId: string) {
    if (this.sceneIdToStatus.has(sceneId)) {
      const status = this.sceneIdToStatus.get(sceneId)
      if (status.isAwake()) {
        status.setStarted(true)
        this.emit('Scene.started', sceneId, this.forceSceneIdToScene(sceneId))
      }
    }
  }

  protected checkSceneAndTriggerEffects(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status) {
      console.error('Logical error -- this shouldnt happen')
      debugger
      throw new Error()
    }
    if (status.shouldAwake()) {
      status.setAwake(true)
      this.emit('Scene.awake', sceneId, this.forceSceneIdToScene(sceneId))
    } else if (status.shouldSleep()) {
      status.setAwake(false)
      this.emit('Scene.sleep', sceneId, this.forceSceneIdToScene(sceneId))
    }
  }

  reportSightedParcels(sightedParcels: string[], lostSightParcels: string[]) {
    this.updateSightCounts(sightedParcels, lostSightParcels)
    this.checkScenesResolved(sightedParcels)
    this.checkScenesResolved(lostSightParcels)
    const checkMe: { [sceneId: string]: boolean } = {}
    for (let sighted of sightedParcels) {
      if (this.positionHasData(sighted)) {
        checkMe[this.forcePositionToSceneId(sighted)] = true
      }
    }
    for (let lost of lostSightParcels) {
      if (this.positionHasData(lost)) {
        checkMe[this.forcePositionToSceneId(lost)] = true
      }
    }
    const sceneIds = Object.keys(checkMe).filter(_ => _ && !!checkMe[_])
    for (let sceneId of sceneIds) {
      this.checkSceneAndTriggerEffects(sceneId)
    }
  }

  protected processNewPositionMapping(position: string, sceneId: string) {
    if (!sceneId) {
      const status = this.forcePositionToStatus(position)
      if (!status) {
        console.log('e', position, sceneId)
        debugger
      }
      status.setEmpty(true)
      this.emit('Parcel.empty', position)
    } else if (this.shouldResolveSceneId(sceneId)) {
      this.resolvePositionToScene(position).then(scene => {
        this.processNewSceneMapping(this.forcePositionToSceneId(position), scene)
      })
    } else if (this.isSceneResolved(sceneId)) {
      if (this.positionToStatus.get(position) !== this.sceneIdToStatus.get(sceneId)) {
        this.emit('Parcel.hideLoader')
        const newStatus = this.sceneIdToStatus.get(sceneId)
        const deprecatedStatus = this.positionToStatus.get(position)
        while (deprecatedStatus.shouldRender()) {
          deprecatedStatus.decreaseSight()
          newStatus.increaseSight()
        }
        this.positionToStatus.set(position, newStatus)
      }
    }
  }

  protected processNewSceneMapping(sceneId: string, scene: ILand<any>) {
    const oldStatus = this.sceneIdToStatus.get(sceneId)
    console.log(sceneId, scene)
    if (!oldStatus) {
      this.sceneIdToStatus.set(sceneId, new SceneLifeCycleStatus(0))
      ;(scene as any).scene.scene.parcels.forEach(pos => this.processNewPositionMapping(pos, sceneId))
      this.emit('Scene.loading', sceneId, scene)
    }
    this.checkSceneAndTriggerEffects(sceneId)
  }

  resolvePositionToSceneId(xy: string) {
    return this.positionToSceneId.resolve(xy)
  }

  protected resolveSceneIdToScene(sceneId: string) {
    return this.sceneIdToData.resolve(sceneId)
  }

  protected async resolvePositionToScene(sceneId: string) {
    return this.sceneIdToData.resolve(await this.positionToSceneId.resolve(sceneId))
  }

  protected shouldResolveSceneId(sceneId: string) {
    const record = this.sceneIdToData.record.get(sceneId)
    if (!record) {
      return true
    } else {
      return !record.loading && !record.error
    }
  }

  protected shouldResolvePosition(position: string) {
    const record = this.positionToSceneId.record.get(position)
    if (!record) {
      return true
    } else {
      return !record.loading && !record.error
    }
  }

  isPositionRendereable(position: string) {
    return this.positionToStatus.has(position) && this.positionToStatus.get(position).isRendereable()
  }

  protected isPositionResolved(position: string) {
    return this.positionToSceneId.record.has(position) && this.positionToSceneId.record.get(position).success
  }

  protected isSceneResolved(sceneId: string) {
    return this.sceneIdToData.record.has(sceneId) && this.sceneIdToData.record.get(sceneId).success
  }

  protected isPositionResolvedToScene(position: string) {
    return this.isPositionResolved(position) && this.isSceneResolved(this.forcePositionToSceneId(position))
  }

  protected positionHasData(position: string) {
    return this.isPositionResolvedToScene(position)
  }

  protected forcePositionToSceneId(position: string) {
    return this.positionToSceneId.record.get(position).data
  }

  protected forcePositionToStatus(position: string) {
    return this.sceneIdToStatus.get(this.forcePositionToSceneId(position))
  }

  protected forceSceneIdToScene(sceneId: string) {
    return this.sceneIdToData.record.get(sceneId).data
  }

  protected updateSightCounts(sightedParcels: string[], lostSightParcels: string[]) {
    for (let sighted of sightedParcels) {
      if (!this.positionToStatus.get(sighted)) {
        this.positionToStatus.set(sighted, new SceneLifeCycleStatus(1))
        this.emit('Parcel.showLoader', sighted)
      } else {
        this.positionToStatus.get(sighted).increaseSight()
      }
    }
    for (let lost of lostSightParcels) {
      if (!this.positionToStatus.get(lost)) {
        this.positionToStatus.set(lost, new SceneLifeCycleStatus(0))
        this.emit('Parcel.hideLoader', lost)
      } else {
        this.positionToStatus.get(lost).decreaseSight()
      }
    }
  }

  protected checkScenesResolved(positions: string[]) {
    for (let pos of positions) {
      if (this.shouldResolvePosition(pos)) {
        this.resolvePositionToSceneId(pos)
          .then(sceneId => {
            this.processNewPositionMapping(pos, sceneId)
          })
          .catch(err => {
            debugger
            console.log(err)
          })
      }
      if (this.isPositionResolved(pos) && this.shouldResolveSceneId(this.forcePositionToSceneId(pos))) {
        this.resolveSceneIdToScene(this.forcePositionToSceneId(pos))
          .then(scene => {
            if (!scene) this.processNewSceneMapping(this.forcePositionToSceneId(pos), scene)
          })
          .catch(err => {
            debugger
            console.log(err)
          })
      }
    }
  }
}
