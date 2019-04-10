// tslint:disable:no-console
declare var global: any
declare var window: any
declare var UnityLoader: UnityLoaderType

global['preview'] = window['preview'] = true
global['avoidWeb3'] = window['avoidWeb3']

import { initializeEngine } from '../unity-interface/dcl'

type UnityLoaderType = {
  instantiate(divId: string, manifest: string): UnityGame
}

type UnityGame = {
  SendMessage(object: string, method: string, args: number | string): void
  SetFullscreen(): void
}

const gameInstance: UnityGame = UnityLoader.instantiate('gameContainer', '/unity/Build/unity.json')
let instancedJS: ReturnType<typeof initializeEngine> | null = null

namespace DCL {
  export function EngineStarted() {
    instancedJS = initializeEngine(gameInstance)

    instancedJS.catch(error => {
      document.body.classList.remove('dcl-loading')
      document.body.innerHTML = `<h3>${error.message}</h3>`
    })
  }

  export function MessageFromEngine(type: string, jsonEncodedMessage: string) {
    if (instancedJS) {
      instancedJS
        .then($ => $.onMessage(type, JSON.parse(jsonEncodedMessage)))
        .catch(() => {
          console.error('Message received without initializing engine', type, jsonEncodedMessage)
        })
    } else {
      console.error('Message received without initializing engine', type, jsonEncodedMessage)
    }
  }
}

global['DCL'] = DCL
