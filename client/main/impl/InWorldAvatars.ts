import { SubsystemController } from '../subsystems'
import { AvatarPresenceManager } from 'dcl/client/presence/avatarPresence'
import { PeerPresenceSystem } from './PeerPresence'
import { PassportSystem } from './Passport'

export class InWorldAvatarSystem extends SubsystemController {
  avatarPresence: any

  protected async onStart() {
    this.avatarPresence = new AvatarPresenceManager(
      (this.deps.filter(dep => dep.name === 'PeerPresence')[0] as PeerPresenceSystem).peerPresence,
      (this.deps.filter(dep => dep.name === 'Passports')[0] as PassportSystem).passports!
    )
    return this.onStart()
  }
}
