import { NetworkedState } from '../NetworkedState'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import {
  AUTHORITY_ANNOUNCEMENT,
  AUTHORITY,
  AuthorityAnnouncementMessage,
  AUTHORITY_QUERY,
  AuthorityQueryMessage,
  FROM,
  TO
} from '../messages'
import { TimeSystem } from './TimeSystem'

export const AUTHORITY_QUERY_TIMEOUT = 5000 /* 5 second check */

export abstract class AuthorityAwareSystem extends TimeSystem {
  public lastAuthorityUpdate: number = 0
  public lastAuthorityQuery: number = 0

  constructor(public state: NetworkedState, public bus: IMessageBus) {
    super()
  }

  areWeAuthoritative() {
    return this.state.authority === this.state.syncId
  }

  protected setupCheckOtherAuthorityAnnouncements() {
    this.bus.on(AUTHORITY_ANNOUNCEMENT, (key: string, message: AuthorityAnnouncementMessage) => {
      this.lastAuthorityUpdate = this.now()
      if (message[AUTHORITY] !== this.state.authority) {
        this.updateAuthority(message[AUTHORITY])
      }
    })
  }

  protected setupReplyToAuthorityAnnouncements() {
    this.bus.on(AUTHORITY_QUERY, (key: string, message: AuthorityQueryMessage) => {
      if (this.areWeAuthoritative()) {
        this.sendAuthorityAnnouncement(message[FROM])
      }
    })
  }

  protected sendAuthorityAnnouncement(to: string) {
    this.bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: this.state.syncId, [AUTHORITY]: this.state.syncId, [TO]: to })
  }

  protected updateAuthority(authority: string) {
    this.lastAuthorityUpdate = this.now()
    this.state.authority = authority
  }

  protected authorityRadioSilence() {
    return this.now() - this.lastAuthorityUpdate >= AUTHORITY_QUERY_TIMEOUT
  }

  protected authorityCheckTimeOverdue() {
    return this.authorityRadioSilence() && this.authorityQueryTimedOut()
  }

  protected authorityQueryTimedOut() {
    return this.now() - this.lastAuthorityQuery >= AUTHORITY_QUERY_TIMEOUT
  }

  protected sendAuthorityQuery() {
    this.lastAuthorityQuery = this.now()
    this.bus.emit(AUTHORITY_QUERY, { [FROM]: this.state.syncId })
  }
}
