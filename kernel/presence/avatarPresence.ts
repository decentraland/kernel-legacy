import { PeerPresenceManager } from './peers/peerPresence'
import { ProfileStore } from '../passports/ProfileStore'

export class AvatarPresenceManager {
  peerPresence: PeerPresenceManager
  profile: ProfileStore

  constructor(peerPresence: PeerPresenceManager, profile: ProfileStore) {
    this.peerPresence = peerPresence
    this.profile = profile
  }
}
