import { SyncPeerId } from './SyncPeerId'
import { UserState } from './UserState'

export interface NetworkedState {
  /**
   * An identifier to recognize our messages
   */
  syncId: SyncPeerId

  /**
   * Whether we are the authoritative party in the scene
   */
  authority: SyncPeerId

  /**
   * List of registered peers
   */
  registeredPeers: Record<SyncPeerId, UserState>
}
