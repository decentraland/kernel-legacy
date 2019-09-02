import { NetworkedState } from '../NetworkedState'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { AUTHORITY_ANNOUNCEMENT, AUTHORITY, FROM } from '../messages'
import { AuthorityAwareSystem } from './AuthorityAwareSystem'

export const AUTHORITY_BEACON_INTERVAL = 1000

export class AuthorityBeaconSystem extends AuthorityAwareSystem {
  public lastAuthorityBeaconSent: number

  constructor(public state: NetworkedState, public bus: IMessageBus) {
    super(state, bus)
  }

  update(dt: number) {
    super.update(dt)
    this.checkAndSendAuthorityBeacon()
  }

  protected sendAuthorityBeacon() {
    this.lastAuthorityBeaconSent = this.now()
    this.bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: this.state.syncId, [AUTHORITY]: this.state.syncId })
  }

  protected authorityBeaconTimeOverdue() {
    return this.now() - this.lastAuthorityBeaconSent >= AUTHORITY_BEACON_INTERVAL
  }

  protected checkAndSendAuthorityBeacon() {
    if (this.areWeAuthoritative() && this.authorityBeaconTimeOverdue()) {
      this.sendAuthorityBeacon()
    }
  }
}
