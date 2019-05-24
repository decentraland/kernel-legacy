import { DecentralandInterface, ModuleDescriptor, IEvents } from './Types'
import { Observable } from '../ecs/Observable'

declare const dcl: DecentralandInterface

let communicationsController: ModuleDescriptor | null = null
let communicationsControllerPromise: PromiseLike<ModuleDescriptor> | null = null

let _messageObserver: null | Observable<IEvents['comms']> = null

/**
 * @internal
 */
export function getMessageObserver() {
  if (!_messageObserver) {
    _messageObserver = new Observable<IEvents['comms']>()
  }
  return _messageObserver!
}

function ensureCommunicationsController() {
  if (!communicationsControllerPromise) {
    communicationsControllerPromise = dcl.loadModule('@decentraland/CommunicationsController')

    communicationsControllerPromise.then($ => {
      dcl.log('Module loaded', $)
      communicationsController = $
    })

    const observer = getMessageObserver()

    dcl.onEvent(event => {
      if (event.type === 'comms') {
        dcl.log('Receiving comms message ', event.data)
        observer.notifyObservers(event.data as any)
      }
    })
  }
  return communicationsControllerPromise
}

/**
 * @beta
 */
export class MessageBus {
  private messageQueue: string[] = []

  constructor() {
    ensureCommunicationsController().then($ => {
      this.flush()
    })
  }

  on(message: string, callback: (value: Record<any, any>, sender: string) => void) {
    getMessageObserver().add(e => {
      try {
        let m = JSON.parse(e.message)

        if (m.message === message) {
          callback(m.message, e.sender)
        }
      } catch (e) {
        dcl.error('Error parsing comms message ' + e.message, e)
      }
    })
  }

  // @internal
  sendRaw(message: string) {
    this.messageQueue.push(message)
  }

  send(message: string, payload: Record<any, any>) {
    const messageToSend = JSON.stringify({ message, payload })
    this.sendRaw(messageToSend)
    getMessageObserver().notifyObservers({ message: messageToSend, sender: 'self' })
  }

  private flush() {
    if (this.messageQueue.length === 0) return
    if (!communicationsController) return
    const message = this.messageQueue.shift()
    dcl.callRpc(communicationsController.rpcHandle, 'send', [message]).then(_ => this.flush())
  }
}
