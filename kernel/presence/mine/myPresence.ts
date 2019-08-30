const qs = require('querystring')
import {
  MVector2,
  MVector3,
  Observable,
  playerConfigurations,
  Quaternion,
  ReadOnlyVector2,
  Vector3,
  worldToGrid
} from '@dcl/utils'
import { SceneLoader } from '../../scenes/loader/SceneLoader'
import { migrateFromILand } from '../../worldMap/sceneCompatibility/migrateFromILand'
import { PositionReport } from '../types/PositionReport'
import { getPositionReport } from './getPositionReport'
import { getTopicForPosition } from './getTopicForPosition'

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
    const scene = migrateFromILand(landData)
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

  getPositionReport() {
    return getPositionReport(this.lastPlayerPositionReport)
  }

  getTopicForCurrentPosition() {
    return getTopicForPosition(this.lastPlayerPositionReport.position)
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
