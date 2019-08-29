import { getServerConfigurations } from '@dcl/config'
import future, { IFuture } from 'fp-future'

import { SubsystemController } from '../subsystems'
import Auth from '../../auth'

export class AuthSystem extends SubsystemController {
  auth: Auth

  callback?: IFuture<boolean>

  protected async onStart() {
    try {
      this.auth = new Auth({
        api: {
          baseURL: getServerConfigurations().auth
        }
      })
      this.statusObservable.notifyObservers('UserWaiting')
      this.callback = future<boolean>()
      if (await this.callback) {
        await this.auth.getAccessToken()
        return this.onSuccess()
      } else {
        return this.onError(new Error('Could not log in'))
      }
    } catch (e) {
      this.onError(e)
    }
  }
}
