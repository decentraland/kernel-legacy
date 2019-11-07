import { disconnect } from '../comms'
import { setLoadingScreenVisible } from '../../unity-interface/dcl'
import { Auth } from 'shared/auth/Auth'
import { future, IFuture } from 'fp-future'

export class Session {
  private static _instance: IFuture<Session> = future()

  auth?: Auth

  static get current() {
    return Session._instance
  }

  async logout() {
    setLoadingScreenVisible(true)
    disconnect()
    this.auth && (await this.auth.logout())
  }
}
