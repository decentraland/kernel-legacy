import { SubsystemController } from '../subsystems'
import { connect } from '../../comms/connect'
import { WorldInstanceConnection } from '../../comms/worldInstanceConnection'
import { AuthSystem } from '../impl'

export class CommsSystem extends SubsystemController {
  worldInstanceConnection?: WorldInstanceConnection

  protected async onStart() {
    const auth: AuthSystem = this.deps.filter(dep => dep.name === 'Auth')[0] as AuthSystem
    if (!auth.auth.isLoggedIn) {
      return this.onError(new Error('Tried to start comms without being logged in'))
    }
    this.worldInstanceConnection = await connect(auth.auth)
    return this.onSuccess()
  }
}
