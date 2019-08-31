import { Observable, IScene, createLogger } from '@dcl/utils'
import { EventEmitter } from 'events'
import { SceneLifeCycleStatus } from './SceneLifeCycleStatus'
import { PositionToSceneId } from './requests/PositionToSceneId'
import { SceneDataDownloadManager } from './requests/SceneDataDownloadManager'
import { SceneIdToData } from './requests/SceneIdToData'
import { ParcelSightController } from './ParcelSightController'

export type SceneLifeCycleStatusReport = { sceneId: string; status: SceneLifeCycleStatus }

export const sceneLifeCycleObservable = new Observable<Readonly<SceneLifeCycleStatusReport>>()

const logger = createLogger('SceneLifecycle')

export class SceneLifeCycleController extends EventEmitter {
  positionToSceneId: PositionToSceneId
  sceneIdToData: SceneIdToData

  // Position to Status
  positionToStatus = new Map<string, SceneLifeCycleStatus>()
  sceneIdToStatus = new Map<string, SceneLifeCycleStatus>()
  parcelShowingLoad: { [position: string]: boolean } = {}

  constructor(public downloadManager: SceneDataDownloadManager, public parcelController: ParcelSightController) {
    super()
    this.positionToSceneId = new PositionToSceneId(downloadManager)
    this.sceneIdToData = new SceneIdToData(downloadManager, this.positionToSceneId)
  }

  reportSightedParcels(newParcels: string[], lostParcels: string[]) {
    this.updateSceneSightCount(newParcels, lostParcels)
    newParcels.forEach(position => {
      if (!this.positionToSceneId.hasStartedResolving(position)) {
        this.showLoader(position)
        this.positionToSceneId.resolve(position).then(() => this.checkPosition(position))
      } else if (this.positionToSceneId.hasFinishedResolving(position)) {
        this.handleSceneMoreVisible(this.positionToSceneId.getScene(position))
      }
    })
    lostParcels.forEach(position => {
      this.hideParcel(position)
    })
  }

  checkPosition(position: string) {
    const sceneId = this.positionToSceneId.getScene(position)
    if (!sceneId && this.positionToSceneId.hasFinishedResolving(position)) {
      this.emit('Parcel.empty', position)
    } else if (sceneId) {
      if (!this.sceneIdToData.hasStartedResolving(sceneId)) {
        this.sceneIdToData.resolve(sceneId).then(() => this.checkScene(sceneId))
      } else if (this.sceneIdToData.hasFinishedResolving(sceneId)) {
        this.checkScene(sceneId)
      }
    }
  }

  checkScene(sceneId: string) {
    const scene = this.sceneIdToData.getScene(sceneId)
    if (!scene && !this.sceneIdToData.hasStartedResolving(sceneId)) {
      this.sceneIdToData.resolve(sceneId).then(() => this.checkScene(sceneId))
      return
    }
    if (!scene || !this.sceneIdToData.hasFinishedResolving(sceneId)) {
      return
    }
    if (!this.sceneIdToStatus.has(sceneId)) {
      this.setupNewScene(sceneId)
    } else {
      const status = this.sceneIdToStatus.get(sceneId)
      if (status.canLoad()) {
        this.startLoading(sceneId)
      }
    }
  }

  setupNewScene(sceneId: string) {
    const scene = this.sceneIdToData.getScene(sceneId)
    const parcels = (scene.scene as IScene).scene.parcels
    const count = parcels.reduce((count, position) => count + (this.parcelController.inSight(position) ? 1 : 0), 0)
    const status = new SceneLifeCycleStatus(sceneId, count)
    this.sceneIdToStatus.set(sceneId, status)
    parcels.forEach(position => this.positionToStatus.set(position, status))
    this.startLoading(sceneId)
  }

  reportSceneFinishedFirstRound(sceneId: string) {
    this.startAwake(sceneId)
  }

  reportSceneRunning(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status || !status.canRun()) {
      logger.info(`Scene ${sceneId} asked to run but it can't: ${JSON.stringify(status)}`)
    }
    const scene = this.sceneIdToData.getScene(sceneId)
    ;(scene.scene as IScene).scene.parcels.forEach(pos => this.hideLoader(pos))
    status.reportRunning()
    this.emit('Scene.running', { sceneId, scene })
  }

  isPositionWalkable(position: string): boolean {
    return this.positionToStatus.has(position) && this.positionToStatus.get(position).isRunning()
  }

  private startLoading(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status || !status.canLoad()) {
      logger.info(`Scene ${sceneId} asked to load but it can't: ${JSON.stringify(status)}`)
    }
    status.reportLoading()
    this.emit('Scene.loading', { sceneId, scene: this.sceneIdToData.getScene(sceneId) })
  }

  private startAwake(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status || !status.canAwake()) {
      logger.info(`Scene ${sceneId} asked to awake but it can't: ${status.toString()}`)
    }
    this.sceneIdToStatus.has(sceneId) && this.sceneIdToStatus.get(sceneId).reportAwake()
    this.emit('Scene.awake', { sceneId, scene: this.sceneIdToData.getScene(sceneId) })
  }

  showLoader(position: string) {
    if (!this.parcelShowingLoad[position]) {
      this.parcelShowingLoad[position] = true
      this.emit('Parcel.showLoader', position)
    }
  }

  hideLoader(position: string) {
    if (this.parcelShowingLoad[position]) {
      this.parcelShowingLoad[position] = false
      this.emit('Parcel.hideLoader', position)
    }
  }

  hideParcel(position: string) {
    this.hideLoader(position)
    const sceneId = this.positionToSceneId.getScene(position)
    if (!sceneId) {
      return
    }
    this.handleSceneLessVisible(sceneId)
  }

  handleSceneLessVisible(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status) {
      return
    }
    if (!status.isVisible()) {
      status.reportStopped()
      this.emit('Scene.stop', sceneId, this.sceneIdToData.getScene(sceneId))
    }
  }

  handleSceneMoreVisible(sceneId: string) {
    const status = this.sceneIdToStatus.get(sceneId)
    if (!status) {
      this.setupNewScene(sceneId)
    } else {
      if (status.canLoad()) {
        this.startLoading(sceneId)
      }
    }
  }

  updateSceneSightCount(newParcels: string[], lostParcels: string[]) {
    newParcels.filter(_ => this.positionToStatus.has(_)).forEach(_ => this.positionToStatus.get(_).increaseSight())
    lostParcels.filter(_ => this.positionToStatus.has(_)).forEach(_ => this.positionToStatus.get(_).decreaseSight())
  }
}
