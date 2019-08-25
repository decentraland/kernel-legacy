const qs = require('querystring')
import { MVector3, ReadOnlyVector3, ReadOnlyQuaternion, MVector2, ReadOnlyVector2 } from '@dcl/utils'
import { Observable, Quaternion, worldToGrid, Vector3, playerConfigurations } from '@dcl/utils'

import { upgradeToV2 } from '../../worldMap/compat/v1'
import { SceneLoader } from '../../scenes/loader/SceneLoader'

export type PositionReport = {
  /** Camera position, world space */
  position: ReadOnlyVector3
  /** Camera rotation */
  quaternion: ReadOnlyQuaternion
  /** Camera rotation, euler from quaternion */
  rotation: ReadOnlyVector3
  /** Camera height, relative to the feet of the avatar or ground */
  playerHeight: number
}

const temporaryVector = new MVector2()

export class MyPresence {
  positionObservable = new Observable<Readonly<PositionReport>>()
  teleportObservable = new Observable<ReadOnlyVector2>()

  lastTeleport: ReadOnlyVector2
  lastPlayerPositionReport: PositionReport
  lastPlayerPosition: MVector3 = new MVector3()
  lastTimeUpdatedUrl = 0

  constructor(public loader: SceneLoader, public history: History, public location: Location) {
    this.enablePositionWatch()
    this.enableUrlUpdates()
    this.enableNotifySceneLoader()
  }

  copyPositionToLocalListener = event => {
    this.lastPlayerPositionReport = event
    this.lastPlayerPosition.copyFrom(event.position)
  }

  notifyLoaderListener = event => {
    this.loader.reportCurrentPosition(event.position)
  }

  updateUrlPositionListener = event => {
    if (performance.now() > this.lastTimeUpdatedUrl + 1000) {
      this.updateUrlPosition(event.position)
      this.lastTimeUpdatedUrl = performance.now()
    }
  }

  goTo = (x: number, y: number) => this.teleport(x, y)
  teleportTo = (x: number, y: number) => this.teleport(x, y)
  async teleport(x: number, y: number) {
    this.lastTeleport = { x, y }
    this.teleportObservable.notifyObservers({ x, y })
    const landData = await this.loader.getSceneForCoordinates(x, y)
    const scene = upgradeToV2(landData)
    const spawn = scene.pickSpawnPoint()
    const pos = spawn.position
    const rotation = Quaternion.RotationYawPitchRoll(spawn.camera.y, 0, 0)

    this.positionObservable.notifyObservers({
      position: pos,
      quaternion: rotation,
      rotation: rotation.eulerAngles,
      playerHeight: playerConfigurations.height
    })
  }

  updateUrlPosition(cameraVector: Vector3) {
    worldToGrid(cameraVector, temporaryVector)
    const positionInUrl = qs.parse(this.location.search.slice(1) || '')
    if (positionInUrl.x !== temporaryVector.x || positionInUrl.y !== temporaryVector.y) {
      positionInUrl.x = temporaryVector.x
      positionInUrl.y = temporaryVector.y
      this.history.replaceState({}, '', '?' + qs.stringify(positionInUrl))
    }
  }

  enablePositionWatch() {
    this.positionObservable.add(this.copyPositionToLocalListener)
  }

  disablePositionWatch() {
    this.positionObservable.removeCallback(this.copyPositionToLocalListener)
  }

  enableUrlUpdates() {
    this.positionObservable.add(this.updateUrlPositionListener)
  }

  disableUrlUpdates() {
    this.positionObservable.removeCallback(this.updateUrlPositionListener)
  }

  enableNotifySceneLoader() {
    this.positionObservable.add(this.notifyLoaderListener)
  }

  disableNotifySceneLoader() {
    this.positionObservable.removeCallback(this.notifyLoaderListener)
  }
}
