import { EventEmitter } from 'events'
import { Vector2 } from '@dcl/utils'
import { SceneDataDownloadManager } from './requests/SceneDataDownloadManager'
import { ParcelSightController, DeltaParcelSightSeeingReport } from './ParcelSightController'
import { SceneLifeCycleController } from './SceneLifeCycleController'
import { PositionLifeCycleController } from './PositionLifecycleController'

export class SceneLoader extends EventEmitter {
  downloadManager: SceneDataDownloadManager
  parcelController: ParcelSightController
  sceneController: SceneLifeCycleController
  positionController: PositionLifeCycleController

  constructor() {
    super()
  }

  setupInjecting(config: {
    downloadManager?: SceneDataDownloadManager
    parcelController?: ParcelSightController
    sceneController?: SceneLifeCycleController
    positionController?: PositionLifeCycleController
    contentServer?: string
    lineOfSightRadius?: number
  }) {
    if (!config.downloadManager && !config.contentServer) {
      throw new Error('Must configure a content server')
    }
    if (!config.parcelController && !config.lineOfSightRadius) {
      throw new Error('Must configure a parcel line of sight radius')
    }
    this.downloadManager = config.downloadManager
      ? config.downloadManager
      : new SceneDataDownloadManager({ contentServer: config.contentServer })
    this.parcelController = config.parcelController
      ? config.parcelController
      : new ParcelSightController({ lineOfSightRadius: config.lineOfSightRadius })
    this.sceneController = config.sceneController
      ? config.sceneController
      : new SceneLifeCycleController(this.downloadManager, this.parcelController)
    this.positionController = config.positionController
      ? config.positionController
      : new PositionLifeCycleController(this.parcelController, this.sceneController)

    // Internal hooks
    this.parcelController.on('Parcel.sightChanges', (data: DeltaParcelSightSeeingReport) => {
      this.sceneController.reportSightedParcels(data.sighted, data.lostSight)
    })
    // External hooks
    this.sceneController.on('Parcel.showLoader', (...args) => this.emit('Parcel.showLoader', ...args))
    this.sceneController.on('Parcel.empty', (...args) => this.emit('Parcel.empty', ...args))
    this.sceneController.on('Parcel.hideLoader', (...args) => this.emit('Parcel.hideLoader', ...args))
    this.sceneController.on('Scene.loading', (...args) => this.emit('Scene.loading', ...args))
    this.sceneController.on('Scene.awake', (...args) => this.emit('Scene.awake', ...args))
    this.sceneController.on('Scene.running', (...args) => this.emit('Scene.running', ...args))
    this.sceneController.on('Scene.stop', (...args) => this.emit('Scene.stop', ...args))
    this.sceneController.on('Scene.error', (...args) => this.emit('Scene.error', ...args))
  }

  setup(contentServer: string, lineOfSightRadius: number) {
    this.setupInjecting({ contentServer, lineOfSightRadius })
  }

  getSceneForCoordinates(x: number | string, y: number | string) {
    return this.downloadManager.getSceneDataForPosition(`${x},${y}`)
  }

  reportCurrentPosition(currentPosition: Vector2) {
    return this.parcelController.reportCurrentPosition(currentPosition)
  }
}
