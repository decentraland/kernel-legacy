import { SubsystemController } from '../subsystems'
import { PeerPresenceManager } from '../../presence/peers/peerPresence'

export class PeerPresenceSystem extends SubsystemController {
  peerPresence?: PeerPresenceManager

  protected async onStart() {
    this.peerPresence = new PeerPresenceManager()
    return this.onStart()
  }
}
