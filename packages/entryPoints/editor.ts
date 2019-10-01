// tslint:disable:no-console
declare var global: any & { isEditor: boolean; editor: any }
declare var window: Window & { isEditor: boolean }

global.isEditor = window.isEditor = true

import { EventEmitter } from 'events'
import future, { IFuture } from 'fp-future'

import { loadedSceneWorkers } from '../shared/world/parcelSceneManager'
import { IScene, normalizeContentMappings, ILand } from '../shared/types'
import { SceneWorker } from '../shared/world/SceneWorker'
import { initializeUnity } from '../unity-interface/initializer'
import {
  UnityParcelScene,
  selectGizmoBuilder,
  setCameraZoomDeltaBuilder,
  getCameraTargetBuilder,
  setPlayModeBuilder,
  loadBuilderScene,
  updateBuilderScene,
  readyBuilderScene,
  preloadFileBuilder,
  getMousePositionBuilder,
  takeScreenshotBuilder,
  futures,
  ActivateRendering,
  DeactivateRendering,
  resetBuilderScene,
  setCameraPositionBuilder,
  setCameraRotationBuilder,
  resetCameraZoomBuilder,
  setBuilderGridResolution,
  setBuilderArrowKeyDown,
  unloadCurrentBuilderScene
} from '../unity-interface/dcl'
import defaultLogger from '../shared/logger'
import { uuid } from '../decentraland-ecs/src/ecs/helpers'
import { Vector3 } from '../decentraland-ecs/src/decentraland/math'
import { sceneLifeCycleObservable } from '../decentraland-loader/lifecycle/controllers/scene'

const evtEmitter = new EventEmitter()
const initializedEngine = future<void>()

let unityScene: UnityParcelScene | undefined
let loadingEntities: string[] = []
let builderSceneLoaded: IFuture<boolean> = future()

/**
 * Function executed by builder
 * It creates the builder scene, binds the scene events and stubs the content mappings
 */
async function createBuilderScene(scene: IScene & { baseUrl: string }) {
  const isFirstRun = unityScene === undefined
  const sceneData = await getSceneData(scene)
  unityScene = loadBuilderScene(sceneData)
  bindSceneEvents()

  const engineReady = future()
  sceneLifeCycleObservable.addOnce(obj => {
    if (sceneData.sceneId === obj.sceneId && obj.status === 'ready') {
      engineReady.resolve(true)
    }
  })
  await engineReady

  if (isFirstRun) {
    readyBuilderScene()
  } else {
    resetBuilderScene()
  }
  await builderSceneLoaded

  ActivateRendering()
  evtEmitter.emit('ready', {})
}

async function renewBuilderScene(scene: IScene & { baseUrl: string }) {
  if (unityScene) {
    scene.baseUrl = unityScene.data.baseUrl
    const sceneData = await getSceneData(scene)
    updateBuilderScene(sceneData)
  }
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
  if (!unityScene) return

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
    } else if (type === 'onEntityLoading') {
      loadingEntities.push(event.payload.entityId)
    } else if (type === 'onEntityFinishLoading') {
      let index = loadingEntities.indexOf(event.payload.entityId)
      if (index >= 0) {
        loadingEntities.splice(index, 1)
      }
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

  unityScene.on('builderSceneStart', e => {
    builderSceneLoaded.resolve(true)
  })

  unityScene.on('builderSceneUnloaded', e => {
    loadingEntities = []
  })
}

namespace editor {
  /**
   * Function executed by builder which is the first function of the entry point
   */
  export async function initEngine(container: HTMLElement) {
    try {
      await initializeUnity(container)
      defaultLogger.log('Engine initialized.')
      initializedEngine.resolve()
    } catch (err) {
      defaultLogger.error('Error loading Unity', err)
      initializedEngine.reject(err)
      throw err
    }
  }

  export async function handleMessage(message: any) {
    if (message.type === 'update') {
      await initializedEngine
      await createBuilderScene(message.payload.scene)
    }
  }
  export function setGridResolution(position: number, rotation: number, scale: number) {
    setBuilderGridResolution(position, rotation, scale)
  }
  export function selectEntity() {
    console.log('selectEntity')
  }
  export function getDCLCanvas() {
    return document.getElementById('#canvas')
  }

  export function getScenes(): Set<SceneWorker> {
    return new Set(loadedSceneWorkers.values())
  }
  export async function sendExternalAction(action: { type: string; payload: { [key: string]: any } }) {
    if (action.type === 'Close editor') {
      unloadCurrentBuilderScene()
      DeactivateRendering()
    } else if (unityScene) {
      const { worker } = unityScene
      if (action.payload.mappings) {
        const scene = action.payload.scene
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
    console.log('resetCameraZoom')
    resetCameraZoomBuilder()
  }

  export function getMouseWorldPosition(x: number, y: number): IFuture<Vector3> {
    // donde T depende de que estes devolviendo
    const id = uuid()
    futures[id] = future()
    console.log('getMouseWorldPosition en EXPLORER x:' + x + ' -  y:' + y + ' . id' + id)
    getMousePositionBuilder(x.toString(), y.toString(), id) // posiblemente haya que mandar mas args en algun caso?
    return futures[id]
  }

  export function handleUnitySomeVale(id: string, value: Vector3) {
    futures[id].resolve(value)
  }

  // TODO: is this needed?
  export function loadImage() {
    console.log('loadImage')
  }
  export function preloadFile(url: string) {
    console.log('preloadFile ' + url)
    preloadFileBuilder(url)
  }
  export function setCameraRotation(alpha: number, beta: number) {
    console.log('setCameraRotation ' + alpha + ',' + beta)
    setCameraRotationBuilder(alpha, beta)
  }
  export function getLoadingEntity() {
    console.log('getLoadingEntity ' + loadingEntities.length)
    if (loadingEntities.length === 0) {
      return null
    } else {
      return loadingEntities[0]
    }
  }
  export function takeScreenshot(mime?: string): IFuture<string> {
    const id = uuid()
    futures[id] = future()
    takeScreenshotBuilder(id)
    return futures[id]
  }

  export function setCameraPosition(position: Vector3) {
    console.log('setCameraPosition ' + position)
    setCameraPositionBuilder(position)
  }

  export const envHelper = null
  export function getCameraPosition() {
    console.log('getCameraPosition')
  }

  export function setArrowKeyDown(key: string) {
    setBuilderArrowKeyDown(key)
  }
}

global.editor = editor
