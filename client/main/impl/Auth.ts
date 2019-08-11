import { SubsystemController } from '../subsystems'
import { checkSession } from 'dcl/client/auth/lib'

export class AuthSystem extends SubsystemController {
  protected async onStart() {
    try {
      await checkSession()
      this.onStart()
    } catch (e) {
      this.onError(e)
    }
  }
}
