// tslint:disable:no-console
declare var global: any
declare var window: any

global['isEditor'] = window['isEditor'] = true
global['avoidWeb3'] = window['avoidWeb3']

import {
  IScene,
  normalizeContentMappings,
  ILand,
  ILandToLoadableParcelScene,
  EnvironmentData,
  LoadableParcelScene
} from '../shared/types'

import { UnityParcelScene, loadBuilderScene } from '../unity-interface/dcl'
import { sleep } from '../atomicHelpers/sleep'
import { loadedParcelSceneWorkers } from '../shared/world/parcelSceneManager'
import { SceneWorker } from '../shared/world/SceneWorker'
import { EventEmitter } from 'events'
import { initializeUnity } from '../unity-interface/initializer'
import { startUnityParcelLoading } from '../unity-interface/dcl'

import future from 'fp-future'

const evtEmitter = new EventEmitter()

let scene: UnityParcelScene

const initializedEngine = future<void>()

async function loadScene(scene: IScene & { baseUrl: string }) {
  if (!scene) return

  let id = '0x0'
  if (scene && scene.scene && scene.scene.base) {
    const [x, y] = scene.scene.base.split(',').map($ => parseInt($, 10))
    id = `${x},${y}`
  }

  const publisher = '0x0'

  const contents = normalizeContentMappings(scene._mappings || [])

  if (!scene.baseUrl) throw new Error('baseUrl missing in scene')

  let defaultScene: ILand = {
    baseUrl: scene.baseUrl,
    scene,
    mappingsResponse: {
      contents,
      parcel_id: id,
      publisher,
      root_cid: 'Qmtest'
    }
  }

  loadBuilderScene(defaultScene)
  await initializePreview(ILandToLoadableParcelScene(defaultScene), scene.scene.parcels.length)
}

async function initializePreview(userScene: EnvironmentData<LoadableParcelScene>, parcelCount: number) {
  console.log('INITIALIZE PREVIEW')
  loadedParcelSceneWorkers.forEach($ => {
    $.dispose()
    loadedParcelSceneWorkers.delete($)
  })
  scene = new UnityParcelScene(userScene)
  let parcelScene = new SceneWorker(scene)

  scene.on('uuidEvent' as any, event => {
    const { type } = event.payload

    if (type === 'gizmoSelected') {
      evtEmitter.emit('gizmoSelected', {
        gizmoType: event.payload['gizmoType'],
        entityId: event.payload['entityId']
      })
    } else if (type === 'gizmoDragEnded') {
      evtEmitter.emit('transform', {
        entityId: event.payload.entityId,
        transform: event.payload.transform
      })
    }
  })

  scene.on('metricsUpdate', e => {
    evtEmitter.emit('metrics', {
      metrics: e.given,
      limits: e.limit
    })
  })

  scene.on('entitiesOutOfBoundaries', e => {
    evtEmitter.emit('entitiesOutOfBoundaries', e)
  })

  scene.on('entityOutOfScene', e => {
    evtEmitter.emit('entityOutOfScene', e)
  })

  scene.on('entityBackInScene', e => {
    evtEmitter.emit('entityBackInScene', e)
  })

  // we need closeParcelScenes to enable interactions in preview mode
  loadedParcelSceneWorkers.add(parcelScene)

  const system = await parcelScene.system

  const engineAPI = parcelScene.engineAPI!

  while (!system.isEnabled || !engineAPI.didStart) {
    await sleep(10)
  }

  console['log']('READYY!!')
  evtEmitter.emit('ready', {})
}

namespace editor {
  export async function handleMessage(message: any) {
    if (message.type === 'update') {
      await initializedEngine
      await loadScene(message.payload.scene)
    }
  }
  export function setGridResolution(position: number, scale: number, radians: number) {
    console.log('setGridResolution')
  }
  export function selectEntity(entityId: string) {
    console.log('selectEntity')
  }
  export function getDCLCanvas() {
    return document.getElementById('gameContainer')
  }
  export function getScenes() {
    return loadedParcelSceneWorkers
  }
  export function sendExternalAction(action: { type: string; payload: { [key: string]: any } }) {
    if (scene) {
      const worker = scene.worker as SceneWorker

      if (action.payload.mappings) {
        // TODO: we need a method to update mappings on the fly on the Unity client
      }

      worker.engineAPI!.sendSubscriptionEvent('externalAction', action)
    }
  }
  export async function initEngine(container: HTMLElement, px: number = 1, py: number = 1) {
    console.log('ction')

    initializeUnity(container)
      .then(async ret => {
        await startUnityParcelLoading(ret.net)
        initializedEngine.resolve()
        document.body.classList.remove('dcl-loading')
      })
      .catch(err => {
        console['error']('Error loading Unity')
        console['error'](err)
        initializedEngine.reject(err)
        throw err
        document.body.classList.remove('dcl-loading')
      })

    /*
    try {
      await initializeUnity(container)
      initializedEngine.resolve()
    } catch (e) {
      initializedEngine.reject(e)
      throw e
    }
*/
  }
  export function selectGizmo(type: string) {
    console.log('selectGizmo ' + type)
  }
  export async function setPlayMode(on: boolean) {
    console.log('ction')
  }
  export async function resize() {
    console.log('ction')
  }
  export function on(evt: string, listener: (...args: any[]) => void) {
    evtEmitter.addListener(evt, listener)
  }
  export function off(evt: string, listener: (...args: any[]) => void) {
    evtEmitter.removeListener(evt, listener)
  }
  export function setCameraZoomDelta(delta: number) {
    console.log('setCameraZoomDelta')
  }
  export function getCameraTarget() {
    console.log('getCameraTarget')
  }
  export function resetCameraZoom() {
    console.log('resetCameraZoom')
  }
  export function getMouseWorldPosition(localX: number, localY: number) {
    console.log('getMouseWorldPosition')
  }
  export function loadImage(url: string, image: HTMLImageElement) {
    console.log('loadImage')
  }
  export function preloadFile(url: string, useArrayBuffer = true) {
    console.log('preloadFile')
  }
  export function setCameraRotation(alpha: number, beta?: number) {
    console.log('setCameraRotation')
  }
  export function getLoadingEntity() {
    console.log('getLoadingEntity')
  }
  export function takeScreenshot(mime: string = 'image/png') {
    console.log('takeScreenshot')
  }

  export function setCameraPosition(position: string) {
    console.log('setCameraPosition ' + position)
  }

  export const envHelper = null
  export function getCameraPosition() {
    console.log('getCameraPosition')
  }
}

global['editor'] = editor
