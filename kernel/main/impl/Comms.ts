import { SubsystemController } from '../subsystems'
import { connect } from '../../comms/connect'
import { ProtocolConnection } from '../../comms/brokers/ProtocolConnection'
import { AuthSystem } from '../impl'
import { intersectLogger, createLogger, Observable } from '@dcl/utils'
import future from 'fp-future'
import { Category, MessageType } from '@dcl/protos'

export const overridenEvents = intersectLogger('Broker: ')
const logger = createLogger('Comms')

export class CommsSystem extends SubsystemController {
  connection?: ProtocolConnection
  lastMessages: any[] = []
  messageObservable = new Observable<any>()

  protected async onStart() {
    const auth: AuthSystem = this.deps.filter(dep => dep.name === 'Auth')[0] as AuthSystem
    if (!auth.auth.isLoggedIn) {
      return this.onError(new Error('Tried to start comms without being logged in'))
    }
    this.connection = await connect(auth.auth)

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
            success.reliable.reject(new Error(args[0]))
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
    this.setupLogger()
    return this.onSuccess()
  }

  setupLogger() {
    const notify = (message: any) => {
      logger.debug(message)
      this.lastMessages.push(message)
      this.messageObservable.notifyObservers(message)
    }
    this.connection.on('' + Category.PROFILE, (data: any) => {
      notify({ type: 'Profile', data })
    })

    this.connection.on('' + MessageType.PING, (data: any) => {
      notify({ type: 'Ping', data })
    })

    this.connection.on('' + Category.SCENE_MESSAGE, (data: any) => {
      notify({ type: 'Scene Message', data })
    })

    this.connection.on('' + Category.CHAT, (data: any) => {
      notify({ type: 'Chat', data })
    })

    this.connection.on('' + Category.POSITION, (data: any) => {
      notify({ type: 'Position', data })
    })
  }
}
