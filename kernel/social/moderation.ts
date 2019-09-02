import { Observable } from '@dcl/utils'
import { getFromLocalStorage, saveToLocalStorage } from '@dcl/utils'

export type ModerationEvent = {
  type: 'BlockedUser' | 'UnblockedUser' | 'MutedUser' | 'UnmutedUser'
  userId: string
}

export class SocialModeration {
  public blockedUsersMap: Map<string, boolean> = new Map<string, boolean>()
  public mutedUsersMap: Map<string, boolean> = new Map<string, boolean>()

  public peerModerationObservable: Observable<ModerationEvent> = new Observable<ModerationEvent>()

  constructor(public getFromStorage = getFromLocalStorage, public saveToStorage = saveToLocalStorage) {
    const blocked: Set<string> = new Set(this.getFromStorage('@dcl-blocked-users'))
    const muted: Set<string> = new Set(this.getFromStorage('@dcl-muted-users'))

    for (let userId of blocked) {
      this.blockedUsersMap.set(userId, true)
    }
    for (let userId of muted) {
      this.mutedUsersMap.set(userId, true)
    }
  }

  /**
   * Returns true if the user is blocked
   * @param userId the target userId
   */
  isUserBlocked(userId: string): boolean {
    return this.blockedUsersMap.has(userId) && this.blockedUsersMap.get(userId)
  }
  /**
   * Returns true if the user is muted
   * @param userId the target userId
   */
  isUserMuted(userId: string): boolean {
    return this.mutedUsersMap.has(userId) && this.mutedUsersMap.get(userId)
  }
  /**
   * Return a list of all the blocked user Ids
   */
  getBlockedUserIds(): string[] {
    return [...this.blockedUsersMap.keys()]
  }
  /**
   * Return a list of all the muted user Ids
   */
  getMutedUserIds(): string[] {
    return [...this.mutedUsersMap.keys()]
  }
  /**
   * Blocks a user based on its userId
   * @param userId the target userId
   */
  blockUser(userId: string) {
    if (!this.blockedUsersMap.has(userId)) {
      this.blockedUsersMap.set(userId, true)
      this.saveToStorage('@dcl-blocked-users', Array.from(this.blockedUsersMap.keys()))
      this.peerModerationObservable.notifyObservers({
        type: 'BlockedUser',
        userId
      })
    }
  }
  /**
   * Unblocks a user, based on its userId
   * @param userId the target userId
   */
  unblockUser(userId: string) {
    if (this.blockedUsersMap.has(userId)) {
      this.blockedUsersMap.delete(userId)
      this.saveToStorage('@dcl-blocked-users', Array.from(this.blockedUsersMap.keys()))
      this.peerModerationObservable.notifyObservers({
        type: 'UnblockedUser',
        userId
      })
    }
  }

  /**
   * Mute a user based on its userId
   * @param userId the target userId
   */
  muteUser(userId: string) {
    if (!this.mutedUsersMap.has(userId)) {
      this.mutedUsersMap.set(userId, true)
      this.saveToStorage('@dcl-muted-users', Array.from(this.mutedUsersMap.keys()))
      this.peerModerationObservable.notifyObservers({
        type: 'MutedUser',
        userId
      })
    }
  }

  /**
   * Unmutes a user, based on its userId
   * @param userId the target userId
   */
  unmuteUser(userId: string) {
    if (this.mutedUsersMap.has(userId)) {
      this.mutedUsersMap.delete(userId)
      this.saveToStorage('@dcl-muted-users', Array.from(this.mutedUsersMap.keys()))
      this.peerModerationObservable.notifyObservers({
        type: 'UnmutedUser',
        userId
      })
    }
  }
}
