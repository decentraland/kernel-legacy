import { NetworkedState } from '../NetworkedState'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { AuthorityBeaconSystem } from './AuthorityBeaconSystem'

export class PeerAuthoritySystem extends AuthorityBeaconSystem {
  constructor(public state: NetworkedState, public bus: IMessageBus) {
    super(state, bus)
  }

  activate() {
    super.activate()
    this.setupReplyToAuthorityAnnouncements()
    this.setupCheckOtherAuthorityAnnouncements()
    this.sendAuthorityQuery()
  }

  update(dt: number) {
    super.update(dt)
    this.lookForAuthority()
  }

  lookForAuthority() {
    if (this.authorityRadioSilence()) {
      if (this.authorityCheckTimeOverdue()) {
        this.updateAuthority(this.state.syncId)
        this.sendAuthorityBeacon()
      } else {
        this.sendAuthorityQuery()
      }
    }
  }
}
