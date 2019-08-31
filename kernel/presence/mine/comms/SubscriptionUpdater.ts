import { WorldInstanceConnection } from '../../../comms/worldInstanceConnection'
import { MyPresence } from '../myPresence'
import { sendUpdateSubscriptions } from './sendUpdateSubscriptions'
import { getTopicForPosition } from '../getTopicForPosition'

export const POSITION_BEACON_INTERVAL = 100

export class SubscriptionUpdater {
  comms: WorldInstanceConnection

  constructor(public myPresence: MyPresence) {}

  positionListener = (pos: { x: number; y: number }) => {
    const topic = getTopicForPosition({ x: pos.x, y: 0, z: pos.y })
    sendUpdateSubscriptions(this.comms, topic)
    console.log('sending on topic', topic, 'for coordinates', pos.x, pos.y)
  }

  activate(comms: WorldInstanceConnection) {
    this.comms = comms
    this.myPresence.parcelPositionObservable.add(this.positionListener)
  }

  deactivate() {
    this.comms = null
    this.myPresence.parcelPositionObservable.removeCallback(this.positionListener)
  }
}
