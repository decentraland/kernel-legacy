import { WorldInstanceConnection } from '../../comms/worldInstanceConnection'
import { PeerPresenceManager } from '../../presence/peers/peerPresence'
import { SubsystemController } from '../subsystems'
import { CommsSystem } from './Comms'

export class PeerPresenceSystem extends SubsystemController {
  peerPresence?: PeerPresenceManager
  connection?: WorldInstanceConnection

  lastMessages: any[] = []

  protected async onStart() {
    this.connection = (this.deps.filter(dep => dep.name === 'Comms')[0] as CommsSystem).connection
    this.peerPresence = new PeerPresenceManager()

    return this.onSuccess()
  }
}