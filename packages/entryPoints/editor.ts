// tslint:disable:no-console
declare var global: any & { isEditor: boolean; editor: any }
declare var window: Window & { isEditor: boolean }

global.isEditor = window.isEditor = true

import { EventEmitter } from 'events'
import future from 'fp-future'

import {
  IScene,
  normalizeContentMappings,
  ILand,
  ILandToLoadableParcelScene,
  EnvironmentData,
  LoadableParcelScene
} from '../shared/types'
import { SceneWorker } from '../shared/world/SceneWorker'
import { loadedParcelSceneWorkers } from '../shared/world/parcelSceneManager'
import { initializeUnity } from '../unity-interface/initializer'
import {
  UnityParcelScene,
  startUnityParcelLoading,
  unityInterface,
  selectGizmoBuilder,
  resetCameraBuilder,
  setCameraZoomDeltaBuilder,
  setPlayModeBuilder
} from '../unity-interface/dcl'

const evtEmitter = new EventEmitter()
const initializedEngine = future<void>()
let scene: UnityParcelScene | null = null

/**
 * It returns base parcel if exists on `scene.json` or "0,0" if `baseParcel` missing
 */
function getBaseCoords(scene: IScene): string {
  if (scene && scene.scene && scene.scene.base) {
    const [x, y] = scene.scene.base.split(',').map($ => parseInt($, 10))
    return `${x},${y}`
  }

  return '0,0'
}

/**
 * It creates and instance the a scene worker and adds it to the world and the
 * `loadedParcelSceneWorkers` list
 */
function loadBuilderScene(scene: EnvironmentData<LoadableParcelScene>): UnityParcelScene | null {
  try {
    const parcelScene = new UnityParcelScene(scene)
    const parcelSceneWorker = new SceneWorker(parcelScene)

    const target: LoadableParcelScene = { ...scene.data }
    delete target.land
    unityInterface.LoadParcelScenes([target])
    return parcelScene
  } catch (e) {
    throw new Error('Could not load scene.json')
  }
}

/**
 * It fakes the content mappings for being used at the Builder without
 * content server plus loads and creates the scene worker
 */
async function loadScene(scene: IScene & { baseUrl: string }) {
  if (!scene) {
    return
  }

  const id = getBaseCoords(scene)
  const publisher = '0x0'
  const contents = normalizeContentMappings(scene._mappings || [])

  if (!scene.baseUrl) {
    throw new Error('baseUrl missing in scene')
  }

  const defaultScene: ILand = {
    baseUrl: scene.baseUrl,
    scene,
    mappingsResponse: {
      contents,
      parcel_id: id,
      publisher,
      root_cid: 'Qmtest'
    }
  }

  await initializePreview(ILandToLoadableParcelScene(defaultScene))
}

async function initializePreview(userScene: EnvironmentData<LoadableParcelScene>) {
  loadedParcelSceneWorkers.forEach($ => {
    $.dispose()
    loadedParcelSceneWorkers.delete($)
  })

  scene = loadBuilderScene(userScene)

  scene!.on('uuidEvent' as any, event => {
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

  scene!.on('metricsUpdate', e => {
    evtEmitter.emit('metrics', {
      metrics: e.given,
      limits: e.limit
    })
  })

  scene!.on('entitiesOutOfBoundaries', e => {
    evtEmitter.emit('entitiesOutOfBoundaries', e)
  })

  scene!.on('entityOutOfScene', e => {
    evtEmitter.emit('entityOutOfScene', e)
  })

  scene!.on('entityBackInScene', e => {
    evtEmitter.emit('entityBackInScene', e)
  })

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
      })
  }
  export function selectGizmo(type: string) {
    selectGizmoBuilder(type)
  }
  export async function setPlayMode(on: boolean) {
    var onString: string = on ? 'true' : 'false'
    setPlayModeBuilder(onString)
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
    setCameraZoomDeltaBuilder(delta)
  }
  export function getCameraTarget() {
    console.log('getCameraTarget')
  }
  export function resetCameraZoom() {
    resetCameraBuilder()
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

global.editor = editor
