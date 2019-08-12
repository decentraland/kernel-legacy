const qs = require('querystring')
import { MVector3, ReadOnlyVector3, ReadOnlyQuaternion, MVector2, ReadOnlyVector2 } from '@dcl/utils/math'
import { worldToGrid, Vector3 } from '@dcl/utils'
import { Observable } from '@dcl/utils'

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
  lastPlayerPosition: MVector3

  history: History
  lastTimeUpdatedUrl = 0

  updateUrlPosition = (cameraVector: Vector3) => {
    worldToGrid(cameraVector, temporaryVector)
    const positionInUrl = qs.parse(this.history.state && this.history.state.location && this.history.state.location.search || '')
    if (positionInUrl.x !== temporaryVector.x || positionInUrl.y !== temporaryVector.y) {
      positionInUrl.x = temporaryVector.x
      positionInUrl.y = temporaryVector.y
      this.history.replaceState({}, '', qs.stringify(positionInUrl))
    }
  }

  copyPositionToLocal = event => {
    this.lastPlayerPosition.copyFrom(event.position)
  }
  updateUrlPositionListener = event => {
    if (performance.now() > this.lastTimeUpdatedUrl + 1000) {
      this.updateUrlPosition(event.position)
      this.lastTimeUpdatedUrl = performance.now()
    }
  }

  constructor(history: History, initialPosition: Vector3) {
    this.history = history
    this.lastPlayerPosition = new MVector3(initialPosition.x, initialPosition.y, initialPosition.z)
    this.positionObservable.add(this.copyPositionToLocal)
    this.positionObservable.add(this.updateUrlPositionListener)
  }

  disableUrlUpdates() {
    this.positionObservable.removeCallback(this.updateUrlPositionListener)
  }

  enableUrlUpdates() {
    this.positionObservable.add(this.updateUrlPositionListener)
  }
}
