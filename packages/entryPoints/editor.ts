// tslint:disable:no-console
declare var global: any & { isEditor: boolean; editor: any }
declare var window: Window & { isEditor: boolean }

global.isEditor = window.isEditor = true

import { EventEmitter } from 'events'
import future from 'fp-future'

import { sleep } from '../atomicHelpers/sleep'
import { loadedSceneWorkers, stopParcelSceneWorker } from '../shared/world/parcelSceneManager'
import {
  IScene,
  normalizeContentMappings,
  ILand,
  ILandToLoadableParcelScene,
  EnvironmentData,
  LoadableParcelScene
} from '../shared/types'
import { SceneWorker } from '../shared/world/SceneWorker'
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
import { SceneDataDownloadManager } from '../decentraland-loader/lifecycle/controllers/download'
import defaultLogger from '../shared/logger'

const evtEmitter = new EventEmitter()
const initializedEngine = future<void>()
let scene: UnityParcelScene | null = null
let sceneData: ILand
let sceneWorker: SceneWorker | null = null

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
    sceneWorker = new SceneWorker(parcelScene)

    const target: LoadableParcelScene = { ...scene.data }
    delete target.land
    loadedSceneWorkers.set(parcelScene.data.sceneId, sceneWorker)
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

  sceneData = {
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

  await initializePreview(ILandToLoadableParcelScene(sceneData))
}

async function initializePreview(userScene: EnvironmentData<LoadableParcelScene>) {
  loadedSceneWorkers.forEach($ => stopParcelSceneWorker($))
  loadedSceneWorkers.clear()
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

  const system = await sceneWorker!.system

  const engineAPI = sceneWorker!.engineAPI!
  while (!system.isEnabled || !engineAPI.didStart) {
    await sleep(10)
  }

  console['log']('REsADYY!!')
  evtEmitter.emit('ready', {})
}

namespace editor {
  export async function handleMessage(message: any) {
    if (message.type === 'update') {
      await initializedEngine
      await loadScene(message.payload.scene)
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
  export function sendExternalAction(action: { type: string; payload: { [key: string]: any } }) {
    if (scene) {
      const worker = scene.worker as SceneWorker

      if (action.payload.mappings) {
        // TODO: we need a method to update mappings on the fly on the Unity client
      }

      worker.engineAPI!.sendSubscriptionEvent('externalAction', action)
    }
  }
  export async function initEngine(container: HTMLElement) {
    const mockedDownloaderManager: Partial<SceneDataDownloadManager> = {
      getParcelDataBySceneId: async id => {
        if (id === '0, 0') {
          return sceneData
        }

        return null
      },
      getParcelData: async position => {
        try {
          if (
            sceneData.scene.scene.parcels.some(p => {
              return p === position.replace(/\ /, '')
            })
          ) {
            return sceneData
          }
        } catch (error) {
          defaultLogger.error('Requesting scene before is initialized.')
        }
        return null
      }
    }

    initializeUnity(container)
      .then(async () => {
        await startUnityParcelLoading(mockedDownloaderManager as SceneDataDownloadManager)
        initializedEngine.resolve()
        document.body.classList.remove('dcl-loading')
      })
      .catch(err => {
        defaultLogger.error('Error loading Unity', err)
        initializedEngine.reject(err)
        throw err
      })
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
    console.log('getCameraTarget')
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
