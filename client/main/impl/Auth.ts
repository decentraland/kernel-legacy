import { SubsystemController } from '../subsystems'
import { checkSession } from '../../auth/lib'

export class AuthSystem extends SubsystemController {
  protected async onStart() {
    try {
      await checkSession()
      return this.onStart()
    } catch (e) {
      this.onError(e)
    }
  }
}
