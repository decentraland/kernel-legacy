import { Vector3 } from 'dcl/utils'
import { ReadOnlyQuaternion } from 'dcl/utils'

/**
 * This class
 */
export type PeerPresence = {
  userId: string
  peerAlias: number
  profileVersion: number
  position: Vector3
  rotation: ReadOnlyQuaternion
  reportedVisible: boolean
  /**
   * For future reference
   *  animation: string
   *  animationStarted: string
   *  animationQueue: string[]
   */
}

export class PeerPresenceManager {
  public presenceByPeer = new Map<string, PeerPresence>()
  public presenceByAlias = new Map<number, PeerPresence>()

  constructor() {}

  setupPresenceForUser(userId: string, peerAlias: number) {
    const presence = {
      userId,
      peerAlias,
      profileVersion: 0,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0, w: 0 },
      reportedVisible: true
    }
    this.presenceByPeer.set(userId, presence)
    this.presenceByAlias.set(peerAlias, presence)
  }

  getPresenceByUserId(userId: string): PeerPresence | undefined {
    if (this.presenceByPeer.has(userId)) {
      return this.presenceByPeer.get(userId)
    }
  }

  getPresenceByAlias(peerAlias: number): PeerPresence | undefined {
    if (this.presenceByAlias.has(peerAlias)) {
      return this.presenceByAlias.get(peerAlias)
    }
  }
}
