import { initializeEngine } from './init'
import { UnityGame } from './types'

/**
 * This is the global-scoped object that Unity executes to send `browserInterface`
 * messages to Explorer
 */
export default class DCL {
  protected instancedJS: ReturnType<typeof initializeEngine> | null = null
  constructor(protected gameInstance: UnityGame) {}

  EngineStarted() {
    this.instancedJS = initializeEngine(this.gameInstance)
    this.instancedJS.catch(error => {
      document.body.classList.remove('dcl-loading')
      document.body.innerHTML = `<h3>${error.message}</h3>`
    })
  }

  MessageFromEngine(type: string, jsonEncodedMessage: string) {
    if (this.instancedJS) {
      this.instancedJS
        .then($ => $.onMessage(type, JSON.parse(jsonEncodedMessage)))
        .catch(error => {
          document.body.classList.remove('dcl-loading')
          document.body.innerHTML = `<h3>${error.message}</h3>`
        })
    } else {
      // tslint:disable:no-console
      console.error('Message received without initializing engine', type, jsonEncodedMessage)
    }
  }
}
