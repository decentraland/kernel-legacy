import { SubsystemController } from '../subsystems'
import { PeerPresenceManager } from 'dcl/client/presence/peerPresence'

export class PeerPresenceSystem extends SubsystemController {
  peerPresence: any

  protected async onStart() {
    this.peerPresence = new PeerPresenceManager()
    this.onStart()
  }
}
