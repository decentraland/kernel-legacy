import { SceneLifeCycleStatus } from '../lib/scene.status'
import { Vector2Component } from 'atomicHelpers/landHelpers'
import future, { IFuture } from 'fp-future'
import { EventEmitter } from 'events'
import { SceneDataDownloadManager } from './download'

export class SceneLifeCycleController extends EventEmitter {
  private downloadManager: SceneDataDownloadManager

  private _positionToSceneCID: { [position: string]: string | undefined } = {}
  private futureOfPositionToCID: { [position: string]: IFuture<string | undefined> } = {}
  private sceneStatus: { [sceneCID: string]: SceneLifeCycleStatus } = {}

  private sceneParcelSightCount: { [sceneCID: string]: number } = {}

  constructor(opts: { downloadManager: SceneDataDownloadManager }) {
    super()
    this.downloadManager = opts.downloadManager
  }

  contains(status: SceneLifeCycleStatus, position: Vector2Component) {
    return (
      status.sceneDescription && status.sceneDescription.scene.scene.parcels.includes(`${position.x},${position.y}`)
    )
  }

  hasStarted(position: string) {
    return (
      this._positionToSceneCID[position] &&
      this.sceneStatus[this._positionToSceneCID[position]!] &&
      this.sceneStatus[this._positionToSceneCID[position]!].isAwake()
    )
  }

  async onSight(position: string) {
    let sceneCID = await this.requestSceneCID(position)
    if (sceneCID) {
      this.sceneParcelSightCount[sceneCID] = this.sceneParcelSightCount[sceneCID] || 0
      this.sceneParcelSightCount[sceneCID]++

      if (!this.sceneStatus[sceneCID]) {
        const data = await this.downloadManager.getParcelData(position)
        if (data) {
          this.sceneStatus[sceneCID] = new SceneLifeCycleStatus(data)
        }
      }
      if (this.sceneStatus[sceneCID].isDead()) {
        this.emit('Preload scene', sceneCID)
        this.sceneStatus[sceneCID].status = 'awake'
      }
    }
  }
  async lostSight(position: string) {
    let sceneCID = await this.requestSceneCID(position)
    if (!sceneCID) {
      return
    }
    this.sceneParcelSightCount[sceneCID] = this.sceneParcelSightCount[sceneCID] || 0
    this.sceneParcelSightCount[sceneCID]--

    if (this.sceneParcelSightCount[sceneCID] <= 0) {
      if (this.sceneStatus[sceneCID] && this.sceneStatus[sceneCID].isAwake()) {
        this.sceneStatus[sceneCID].status = 'unloaded'
        this.emit('Unload scene', sceneCID)
      }
    }
  }

  reportDataLoaded(sceneCID: string) {
    if (this.sceneStatus[sceneCID].status === 'awake') {
      this.sceneStatus[sceneCID].status = 'ready'
      this.emit('Start scene', sceneCID)
    }
  }

  async requestSceneCID(position: string): Promise<string | undefined> {
    if (this._positionToSceneCID[position]) {
      return this._positionToSceneCID[position]
    }
    if (!this.futureOfPositionToCID[position]) {
      this.futureOfPositionToCID[position] = future<string | undefined>()
      try {
        const land = await this.downloadManager.getParcelData(position)
        if (!land) {
          this.futureOfPositionToCID[position].resolve(undefined)
          return this.futureOfPositionToCID[position]
        }
        const sceneCID = land.mappingsResponse.contents.filter($ => $.file === 'scene.json')[0].hash
        for (const pos of land.scene.scene.parcels) {
          if (!this._positionToSceneCID[pos]) {
            this._positionToSceneCID[pos] = sceneCID
          }
          if (!this.futureOfPositionToCID[pos]) {
            continue
          }
          if (this.futureOfPositionToCID[pos].isPending) {
            this.futureOfPositionToCID[pos].resolve(sceneCID)
          }
        }
      } catch (e) {
        this.futureOfPositionToCID[position].reject(e)
      }
      return this.futureOfPositionToCID[position]
    } else {
      const cid = await this.futureOfPositionToCID[position]
      this._positionToSceneCID[position] = cid
      return cid
    }
  }
}
