import { Vector3 } from '@dcl/utils/dist/Vector'
import { Quaternion } from '@dcl/utils/dist/math/Quaternion'

/**
 * This class
 */
export class PeerPresence {
  userId: string
  peerAlias: number
  position: Vector3
  rotation: Quaternion
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
}
