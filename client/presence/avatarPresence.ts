import { PeerPresenceManager } from './peerPresence'
import { ProfileStore } from '../passports/api'

export class AvatarPresenceManager {
  peerPresence: PeerPresenceManager
  profile: ProfileStore

  constructor(peerPresence: PeerPresenceManager, profile: ProfileStore) {
    this.peerPresence = peerPresence
    this.profile = profile
  }
}
