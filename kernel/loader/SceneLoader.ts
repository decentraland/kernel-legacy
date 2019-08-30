import { EventEmitter } from 'events'
import { Vector2 } from '@dcl/utils'
import { SceneDataDownloadManager } from './requests/SceneDataDownloadManager'
import { ParcelLifeCycleController } from './ParcelLifeCycleController'
import { SceneLifeCycleController } from './SceneLifeCycleController'

export class SceneLoader extends EventEmitter {
  downloadManager: SceneDataDownloadManager
  parcelController: ParcelLifeCycleController
  sceneController: SceneLifeCycleController

  constructor(contentServer: string, lineOfSightRadius: number) {
    super()
    this.downloadManager = new SceneDataDownloadManager({ contentServer })
    this.parcelController = new ParcelLifeCycleController({ lineOfSightRadius })
    this.sceneController = new SceneLifeCycleController(this.downloadManager)
    // Internal hooks
    this.parcelController.on('Parcel.sightChanges', (newScenes: string[], old: string[]) =>
      this.sceneController.reportSightedParcels(newScenes, old)
    )
    // External hooks

    // Loading...
    this.sceneController.on('Parcel.showLoader', (...args) => this.emit('Parcel.showLoader', ...args))
    this.sceneController.on('Parcel.empty', (...args) => this.emit('Parcel.empty', ...args))
    this.sceneController.on('Parcel.hideLoader', (...args) => this.emit('Parcel.hideLoader', ...args))
    this.sceneController.on('Scene.loading', (...args) => this.emit('Scene.loading', ...args))
    this.sceneController.on('Scene.awake', (...args) => this.emit('Scene.awake', ...args))
    this.sceneController.on('Scene.started', (...args) => this.emit('Scene.started', ...args))
    this.sceneController.on('Scene.sleep', (...args) => this.emit('Scene.sleep', ...args))
    this.sceneController.on('Scene.error', (...args) => this.emit('Scene.error', ...args))
  }

  getSceneForCoordinates(x: number | string, y: number | string) {
    return this.downloadManager.getSceneData(`${x},${y}`)
  }

  reportCurrentPosition(currentPosition: Vector2) {
    return this.parcelController.reportCurrentPosition(currentPosition)
  }
}
