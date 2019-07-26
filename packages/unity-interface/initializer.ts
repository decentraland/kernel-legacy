import { DEBUG_MESSAGES } from '../config'
import { initShared, initWeb3 } from '../shared'
import { defaultLogger } from '../shared/logger'
import { initializeEngine } from './dcl'
import future from 'fp-future'
const queryString = require('query-string')

declare var global: any
declare var UnityLoader: UnityLoaderType

type UnityLoaderType = {
  // https://docs.unity3d.com/Manual/webgl-templates.html
  instantiate(divId: string | HTMLElement, manifest: string): UnityGame
}

type UnityGame = {
  SendMessage(object: string, method: string, args: number | string): void
  SetFullscreen(): void
}

/**
 * InstancedJS is the local instance of Decentraland
 */
let _instancedJS: ReturnType<typeof initializeEngine> | null = null

/**
 * HTML Container where everything happens
 */
let _container: HTMLElement | null = null

/**
 * UnityGame instance (Either Unity WebGL or Or Unity editor via WebSocket)
 */
let _gameInstance: UnityGame | null = null

export type InitializeUnityResult = {
  engine: UnityGame
  container: HTMLElement
  instancedJS: ReturnType<typeof initializeEngine>
}

const engineInitialized = future()

/** Initialize the engine in a container */
export async function initializeUnity(container: HTMLElement): Promise<InitializeUnityResult> {
  _container = container

  await initShared(container)
  await initWeb3()

  const qs = queryString.parse(document.location.search)

  if (qs.ws) {
    _gameInstance = await initializeUnityEditor(qs.ws, container)
  } else {
    _gameInstance = await UnityLoader.instantiate(container, '/unity/Build/unity.json')
  }

  await engineInitialized

  return {
    engine: _gameInstance!,
    container,
    instancedJS: _instancedJS!
  }
}

namespace DCL {
  // This function get's called by the engine
  export function EngineStarted() {
    if (!_gameInstance) throw new Error('There is no UnityGame')

    _instancedJS = initializeEngine(_gameInstance!)

    _instancedJS
      .then($ => {
        engineInitialized.resolve($)
      })
      .catch(error => {
        engineInitialized.reject(error)
        _container!.classList.remove('dcl-loading')
        _container!.innerHTML = `<h3>${error.message}</h3>`
      })
  }

  export function MessageFromEngine(type: string, jsonEncodedMessage: string) {
    if (_instancedJS) {
      _instancedJS.then($ => $.onMessage(type, JSON.parse(jsonEncodedMessage)))
    } else {
      defaultLogger.error('Message received without initializing engine', type, jsonEncodedMessage)
    }
  }
}

// The namespace DCL is exposed to global because the unity template uses it to
// send the messages
global['DCL'] = DCL

/** This connects the local game to a native client via WebSocket */
function initializeUnityEditor(webSocketUrl: string, container: HTMLElement): UnityGame {
  defaultLogger.info(`Connecting WS to ${webSocketUrl}`)
  container.innerHTML = `<h3>Connecting...</h3>`
  const ws = new WebSocket(webSocketUrl)

  ws.onclose = function(e) {
    defaultLogger.error('WS closed!', e)
    container.innerHTML = `<h3 style='color:red'>Disconnected</h3>`
  }

  ws.onerror = function(e) {
    defaultLogger.error('WS error!', e)
    container.innerHTML = `<h3 style='color:red'>EERRORR</h3>`
  }

  ws.onmessage = function(ev) {
    if (DEBUG_MESSAGES) {
      defaultLogger.info('>>>', ev.data)
    }

    try {
      const m = JSON.parse(ev.data)
      if (m.type && m.payload) {
        const payload = JSON.parse(m.payload)
        _instancedJS!.then($ => $.onMessage(m.type, payload))
      } else {
        defaultLogger.error('Dont know what to do with ', m)
      }
    } catch (e) {
      defaultLogger.error(e)
    }
  }

  const gameInstance: UnityGame = {
    SendMessage(_obj, type, payload) {
      if (ws.readyState === ws.OPEN) {
        const msg = JSON.stringify({ type, payload })
        ws.send(msg)
      }
    },
    SetFullscreen() {
      // stub
    }
  }

  ws.onopen = function() {
    container.classList.remove('dcl-loading')
    defaultLogger.info('WS open!')
    gameInstance.SendMessage('', 'Reset', '')
    container.innerHTML = `<h3  style='color:green'>Connected</h3>`
    DCL.EngineStarted()
  }

  return gameInstance
}
