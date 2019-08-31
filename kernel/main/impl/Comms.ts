import { SubsystemController } from '../subsystems'
import { connect } from '../../comms/connect'
import { WorldInstanceConnection } from '../../comms/worldInstanceConnection'
import { AuthSystem } from '../impl'
import { intersectLogger } from '@dcl/utils'
import future from 'fp-future'

export const overridenEvents = intersectLogger('Broker: ')

export class CommsSystem extends SubsystemController {
  worldInstanceConnection?: WorldInstanceConnection

  protected async onStart() {
    const auth: AuthSystem = this.deps.filter(dep => dep.name === 'Auth')[0] as AuthSystem
    if (!auth.auth.isLoggedIn) {
      return this.onError(new Error('Tried to start comms without being logged in'))
    }
    this.worldInstanceConnection = await connect(auth.auth)

    const success = { unreliable: future<boolean>(), reliable: future<boolean>(), alias: '' }

    for (let key of ['debug', 'error', 'log', 'warn', 'info', 'debug', 'trace']) {
      overridenEvents.on(key, (...args) => {
        if (args[0] && typeof args[0] === 'string') {
          const arg = args[0].toLowerCase()
          if (arg === 'my alias is') {
            success.alias = arg[1]
          }
          if (arg === 'DataChannel "reliable" has opened'.toLowerCase()) {
            success.reliable.resolve(true)
          }
          if (arg === 'DataChannel "unreliable" has opened'.toLowerCase()) {
            success.unreliable.resolve(true)
          }
          if (arg.includes('error') || arg.includes('timed out') || arg.includes('could not')) {
            success.reliable.reject(args[0])
          }
        }
      })
    }

    async function retry() {
      // Let's go again
      this.worldInstanceConnection = await connect(auth.auth)
      success.unreliable = future<boolean>()
      success.reliable = future<boolean>()
    }

    while (true) {
      try {
        if (await success.reliable) {
          await success.unreliable
          break
        }
        await retry()
      } catch (e) {
        await retry()
      }
    }
    return this.onSuccess()
  }
}
