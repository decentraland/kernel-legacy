import { SubsystemController } from '../subsystems'
import { SocialModeration } from '../../social/moderation'

export class SocialModerationSystem extends SubsystemController {
  socialModeration: any

  protected async onStart() {
    this.socialModeration = new SocialModeration()
    return this.onStart()
  }
}
