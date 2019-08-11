import { SubsystemController } from '../subsystems'
import { SocialModeration } from 'dcl/client/social/moderation'

export class SocialModerationSystem extends SubsystemController {
  socialModeration: any

  protected async onStart() {
    this.socialModeration = new SocialModeration()
    this.onStart()
  }
}
