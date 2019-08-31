import { WorldInstanceConnection } from '../../../comms/worldInstanceConnection'
import { MyPresence } from '../myPresence'
import { sendPosition } from '../../../comms/senders/position'
import { createLogger } from '@dcl/utils'

const logger = createLogger('BroadcastPresence')

export const POSITION_BEACON_INTERVAL = 100

export class BroadcastPresence {
  time: number = 0
  lastPositionSentTimestamp: number = 0

  comms: WorldInstanceConnection

  constructor(public myPresence: MyPresence) {}

  activate(comms: WorldInstanceConnection) {
    this.comms = comms
    this.time = 0
  }

  deactivate() {
    this.comms = null
  }

  update(dt: number) {
    if (!this.comms) {
      return
    }
    this.time += dt
    this.checkAndAnnouncePosition()
  }

  checkAndAnnouncePosition() {
    if (this.shouldSendPositionBeacon()) {
      const topic = this.myPresence.getTopicForCurrentPosition()
      logger.info('Broadcasting presence on channel', topic)
      sendPosition(this.comms, topic, this.myPresence.getPositionReport() as any)
    }
  }

  shouldSendPositionBeacon() {
    return this.time - this.lastPositionSentTimestamp > POSITION_BEACON_INTERVAL
  }
}
