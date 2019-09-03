import { createLogger } from '@dcl/utils'
import { EventEmitter } from 'events'
import { SceneLifeCyleState } from './SceneStatus/types'
import { SceneIdToSceneManifestState } from './SceneIdToSceneManifest/types'
import { PositionSettlementState } from './PositionSettlement/types'

const logger = createLogger('SceneLifecycle')

export class SceneLifeCycleController extends EventEmitter {
  _sceneLifeCycle: SceneLifeCyleState
  _scenesById: SceneIdToSceneManifestState
  _positionSettlement: PositionSettlementState

  reportSightedParcels(newParcels: string[], lostParcels: string[]) {
    this.updateSceneSightCount(newParcels, lostParcels)
    newParcels.forEach(position => {
      // console.log(`updating position to ${position} -- ${newParcels}`)
      if (!this.isPositionWalkable(position)) {
        this.showLoader(position)
      }
      if (!this.positionToSceneId.hasStartedResolving(position)) {
        const promise = this.positionToSceneId.requestResolution(position)
        // console.log(`updating ${position} got into a promise to resolve: ${promise}`)
        promise.then(() => this.checkPosition(position))
      } else if (this.positionToSceneId.hasFinishedResolving(position)) {
        // console.log('Checking scene for', position, this.positionToSceneId.getScene(position))
        if (this.positionToSceneId.hasScene(position)) {
          this.checkScene(this.positionToSceneId.getScene(position))
        }
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
        this.sceneIdToData.requestResolution(sceneId).then(() => this.checkScene(sceneId))
      } else if (this.sceneIdToData.hasFinishedResolving(sceneId)) {
        this.checkScene(sceneId)
      }
    }
  }

  checkScene(sceneId: string) {
    const scene = this.sceneIdToData.getScene(sceneId)
    if (!scene && !this.sceneIdToData.hasStartedResolving(sceneId)) {
      this.sceneIdToData.requestResolution(sceneId).then(() => this.checkScene(sceneId))
      return
    }
    if (!scene || !this.sceneIdToData.hasFinishedResolving(sceneId)) {
      return
    }
    if (this.sceneIdToData.hasFinishedResolving(sceneId)) {
      if (!this.sceneIdToStatus.has(sceneId)) {
        this.setupNewScene(sceneId)
      } else {
        const status = this.sceneIdToStatus.get(sceneId)
        if (status.canLoad()) {
          this.startLoading(sceneId)
        }
      }
    }
  }

  setupNewScene(sceneId: string) {
    const scene = this.sceneIdToData.getScene(sceneId)
    const parcels = scene.positionStrings
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
    scene.positionStrings.forEach(pos => this.hideLoader(pos))
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
    if (!Array.isArray(newParcels) || !Array.isArray(lostParcels)) {
      throw new Error('newParcels and lostParcels must be arrays')
    }
    newParcels.filter(_ => this.positionToStatus.has(_)).forEach(_ => this.positionToStatus.get(_).increaseSight())
    lostParcels.filter(_ => this.positionToStatus.has(_)).forEach(_ => this.positionToStatus.get(_).decreaseSight())
  }
}
