const qs = require('querystring')
import {
  MVector2,
  MVector3,
  Observable,
  playerConfigurations,
  Quaternion,
  ReadOnlyVector2,
  Vector3,
  worldToGrid,
  Vector2
} from '@dcl/utils'
import { SceneLoader } from '../../loader/SceneLoader'
import { migrateFromILand } from '../../worldMap/sceneTransforms/migrateFromILand'
import { PositionReport } from '../types/PositionReport'
import { getPositionReport } from '../getPositionReport'
import { getTopicForPosition } from './getTopicForPosition'

const temporaryVector2 = new MVector2()
export class MyPresence {
  positionObservable = new Observable<Readonly<PositionReport>>()
  parcelPositionObservable = new Observable<ReadOnlyVector2>()
  teleportObservable = new Observable<ReadOnlyVector2>()

  lastTeleport: ReadOnlyVector2
  lastPlayerPositionReport: PositionReport
  lastPlayerPosition: MVector3 = new MVector3()
  lastPlayerParcel: Vector2 = { x: 0, y: 0 }
  lastTimeUpdatedUrl = 0

  constructor(public loader: SceneLoader, public history: History, public location: Location) {
    this.enablePositionWatch()
    this.enableUrlUpdates()
    this.enableNotifySceneLoader()
    this.enableParcelPositionListeners()
  }

  parcelPositionTranslator = (event: PositionReport) => {
    const [x, y] = worldToGrid(event.position)
    if (x !== this.lastPlayerParcel.x || y !== this.lastPlayerParcel.y) {
      this.lastPlayerParcel = { x, y }
      this.parcelPositionObservable.notifyObservers(this.lastPlayerParcel)
    }
  }

  copyPositionToLocalListener = event => {
    this.lastPlayerPositionReport = event
    this.lastPlayerPosition.copyFrom(event.position)
  }

  notifyLoaderListener = event => {
    worldToGrid(event.position, temporaryVector2)
    this.loader.reportCurrentPosition(temporaryVector2)
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
    const pos = new MVector3().copyFrom(spawn.position)
    const rotation = Quaternion.LookRotation(pos, new MVector3(0, 1, 0))

    this.positionObservable.notifyObservers({
      position: pos,
      quaternion: rotation,
      rotation: rotation.eulerAngles,
      playerHeight: playerConfigurations.height
    })
  }

  updateUrlPosition(cameraVector: Vector3) {
    worldToGrid(cameraVector, temporaryVector2)
    const positionInUrl = qs.parse(this.location.search.slice(1) || '')
    if (positionInUrl.x !== temporaryVector2.x || positionInUrl.y !== temporaryVector2.y) {
      positionInUrl.x = temporaryVector2.x
      positionInUrl.y = temporaryVector2.y
      this.history.replaceState({}, '', '?' + qs.stringify(positionInUrl))
    }
  }

  getPositionReport() {
    return getPositionReport(this.lastPlayerPositionReport)
  }

  getTopicForCurrentPosition() {
    return getTopicForPosition(this.lastPlayerPositionReport.position)
  }

  allowedToBroadcastPosition() {
    return !!this.lastPlayerPositionReport
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

  enableParcelPositionListeners() {
    this.positionObservable.add(this.parcelPositionTranslator)
  }

  disableParcelPositionListeners() {
    this.positionObservable.removeCallback(this.parcelPositionTranslator)
  }
}
