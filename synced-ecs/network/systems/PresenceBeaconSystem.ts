import { NetworkedState } from '../NetworkedState'
import { PRESENCE, FROM } from '../messages'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { TimeSystem } from './TimeSystem'

export const BEACON_INTERVAL = 1000

export class PresenceBeaconSystem extends TimeSystem {
  public lastBeacon: number = 0

  constructor(public state: NetworkedState, public bus: IMessageBus) {
    super()
  }

  activate() {
    super.activate()
    this.sendBeacon()
  }

  update(dt: number) {
    super.update(dt)
    this.checkAndSendBeacon()
  }

  checkAndSendBeacon() {
    if (this.shouldSendBeacon()) {
      this.sendBeacon()
    }
  }

  shouldSendBeacon() {
    return this.now() - this.lastBeacon >= BEACON_INTERVAL
  }

  sendBeacon() {
    this.lastBeacon = this.now()
    this.bus.emit(PRESENCE, { [FROM]: this.state.syncId })
  }
}
