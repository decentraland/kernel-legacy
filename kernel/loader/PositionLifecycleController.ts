import { EventEmitter } from 'events'
import { ParcelSightController } from './ParcelSightController'
import { SceneLifeCycleController } from './SceneLifeCycleController'

export class PositionLifeCycleController extends EventEmitter /* Position.settled */ {
  isSettled: boolean = false
  constructor(public parcelController: ParcelSightController, public sceneController: SceneLifeCycleController) {
    super()
    sceneController.on('Scene.running', () => this.checkSettlement())
    parcelController.on('Parcel.sightChanges', () => this.checkSettlement())
  }

  checkSettlement() {
    if (this.isSettled) {
      this.shouldUnsettle()
    } else {
      this.shouldSettle()
    }
  }

  shouldSettle() {
    const list = this.parcelController.currentlySightedList
    const length = list.length
    for (let i = 0; i < length; i++) {
      if (!this.sceneController.isPositionWalkable(list[i])) {
        return
      }
    }
    this.isSettled = true
    this.emit('Position.settled')
  }

  shouldUnsettle() {
    const list = this.parcelController.currentlySightedList
    const length = list.length
    for (let i = 0; i < length; i++) {
      if (this.sceneController.isPositionWalkable(list[i])) {
        return
      }
    }
    this.isSettled = false
    this.emit('Position.unsettled')
  }
}
