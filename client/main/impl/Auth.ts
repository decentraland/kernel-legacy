import { getServerConfigurations } from '@dcl/config'

import { SubsystemController } from '../subsystems'
import Auth from '../../auth'

export class AuthSystem extends SubsystemController {
  auth: Auth

  protected async onStart() {
    try {
      this.auth = new Auth({
        api: {
          baseURL: getServerConfigurations().auth
        }
      })
      return this.onSuccess()
    } catch (e) {
      this.onError(e)
    }
  }
}
