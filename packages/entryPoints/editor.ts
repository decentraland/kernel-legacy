// tslint:disable:no-console
declare var global: any & { isEditor: boolean; editor: any }
declare var window: Window & { isEditor: boolean }

global.isEditor = window.isEditor = true

import { EventEmitter } from 'events'
import future from 'fp-future'

import { sleep } from '../atomicHelpers/sleep'
import { loadedSceneWorkers } from '../shared/world/parcelSceneManager'
import { IScene, normalizeContentMappings, ILand } from '../shared/types'
import { SceneWorker } from '../shared/world/SceneWorker'
import { initializeUnity } from '../unity-interface/initializer'
import {
  UnityParcelScene,
  selectGizmoBuilder,
  resetCameraBuilder,
  setCameraZoomDeltaBuilder,
  getCameraTargetBuilder,
  setPlayModeBuilder,
  loadBuilderScene,
  updateBuilderScene,
  readyBuilderScene
} from '../unity-interface/dcl'
import defaultLogger from '../shared/logger'

const evtEmitter = new EventEmitter()
const initializedEngine = future<void>()

let unityScene: UnityParcelScene

/**
 * Function executed by builder secondly
 * It creates the builder scene, bind the scene events and stub the content mappings
 */
async function createBuilderScene(scene: IScene & { baseUrl: string }) {
  const sceneData = await getSceneData(scene)
  unityScene = loadBuilderScene(sceneData)
  bindSceneEvents()

  const system = await unityScene.worker.system
  const engineAPI = unityScene.worker.engineAPI!
  while (!system.isEnabled || !engineAPI.didStart) {
    await sleep(10)
  }

  readyBuilderScene()
  evtEmitter.emit('ready', {})
}

async function renewBuilderScene(scene: IScene & { baseUrl: string }) {
  scene.baseUrl = unityScene.data.baseUrl
  const sceneData = await getSceneData(scene)
  updateBuilderScene(sceneData)
}

/**
 * It fakes the content mappings for being used at the Builder without
 * content server plus loads and creates the scene worker
 */
async function getSceneData(scene: IScene & { baseUrl: string }): Promise<ILand> {
  const id = getBaseCoords(scene)
  const publisher = '0x0'
  const contents = normalizeContentMappings(scene._mappings || [])

  if (!scene.baseUrl) {
    throw new Error('baseUrl missing in scene')
  }

  return {
    baseUrl: scene.baseUrl,
    sceneId: '0, 0',
    scene,
    mappingsResponse: {
      contents,
      parcel_id: id,
      publisher,
      root_cid: 'Qmtest'
    }
  }
}

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

function bindSceneEvents() {
  unityScene.on('uuidEvent' as any, event => {
    const { type } = event.payload

    if (type === 'gizmoSelected') {
      evtEmitter.emit('gizmoSelected', {
        gizmoType: event.payload['gizmoType'],
        entityId: event.payload['entityId']
      })
    } else if (type === 'gizmoDragEnded') {
      evtEmitter.emit('transform', {
        entityId: event.payload.entityId,
        transform: JSON.parse(event.payload.transform)
      })
    }
  })

  unityScene.on('metricsUpdate', e => {
    evtEmitter.emit('metrics', {
      metrics: e.given,
      limits: e.limit
    })
  })

  unityScene.on('entitiesOutOfBoundaries', e => {
    evtEmitter.emit('entitiesOutOfBoundaries', e)
  })

  unityScene.on('entityOutOfScene', e => {
    evtEmitter.emit('entityOutOfScene', e)
  })

  unityScene.on('entityBackInScene', e => {
    evtEmitter.emit('entityBackInScene', e)
  })
}

namespace editor {
  /**
   * Function executed by builder which is the first function of the entry point
   */
  export async function initEngine(container: HTMLElement) {
    initializeUnity(container)
      .then(async () => {
        defaultLogger.log('Engine initialized.')
        initializedEngine.resolve()
      })
      .catch(err => {
        defaultLogger.error('Error loading Unity', err)
        initializedEngine.reject(err)
        throw err
      })
  }

  export async function handleMessage(message: any) {
    if (message.type === 'update') {
      await initializedEngine
      await createBuilderScene(message.payload.scene)
    }
  }
  export function setGridResolution() {
    console.log('setGridResolution')
  }
  export function selectEntity() {
    console.log('selectEntity')
  }
  export function getDCLCanvas() {
    return document.getElementById('gameContainer')
  }

  export function getScenes(): Set<SceneWorker> {
    return new Set(loadedSceneWorkers.values())
  }
  export async function sendExternalAction(action: { type: string; payload: { [key: string]: any } }) {
    if (unityScene) {
      const { worker } = unityScene
      if (action.payload.mappings) {
        var scene = action.payload.scene
        scene._mappings = action.payload.mappings
        await renewBuilderScene(scene)
      }
      worker.engineAPI!.sendSubscriptionEvent('externalAction', action)
    }
  }

  export function selectGizmo(type: string) {
    selectGizmoBuilder(type)
  }
  export async function setPlayMode(on: boolean) {
    const onString: string = on ? 'true' : 'false'
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
    return getCameraTargetBuilder()
  }
  export function resetCameraZoom() {
    resetCameraBuilder()
  }
  export function getMouseWorldPosition() {
    console.log('getMouseWorldPosition')
  }
  export function loadImage() {
    console.log('loadImage')
  }
  export function preloadFile() {
    console.log('preloadFile')
  }
  export function setCameraRotation() {
    console.log('setCameraRotation')
  }
  export function getLoadingEntity() {
    console.log('getLoadingEntity')
  }
  export function takeScreenshot() {
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
