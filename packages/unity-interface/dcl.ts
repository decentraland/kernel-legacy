declare var window: any

type GameInstance = {
  SendMessage(object: string, method: string, ...args: (number | string)[]): void
}

import { IFuture } from 'fp-future'
import { EventDispatcher } from 'decentraland-rpc/lib/common/core/EventDispatcher'

import {
  LoadableParcelScene,
  EntityAction,
  EnvironmentData,
  ILandToLoadableParcelScene,
  ILandToLoadableParcelSceneUpdate,
  IScene,
  MappingsResponse,
  ILand,
  Profile
} from '../shared/types'
import { DevTools } from '../shared/apis/DevTools'
import { gridToWorld } from '../atomicHelpers/parcelScenePositions'
import { ILogger, createLogger, defaultLogger } from '../shared/logger'
import {
  positionObservable,
  lastPlayerPosition,
  getWorldSpawnpoint,
  teleportObservable
} from '../shared/world/positionThings'
import {
  enableParcelSceneLoading,
  getSceneWorkerBySceneID,
  getParcelSceneID,
  stopParcelSceneWorker,
  loadParcelScene
} from '../shared/world/parcelSceneManager'
import { SceneWorker, ParcelSceneAPI, hudWorkerUrl } from '../shared/world/SceneWorker'
import { ensureUiApis } from '../shared/world/uiSceneInitializer'
import { ParcelIdentity } from '../shared/apis/ParcelIdentity'
import { SceneDataDownloadManager } from '../decentraland-loader/lifecycle/controllers/download'
import { IEventNames, IEvents } from '../decentraland-ecs/src/decentraland/Types'
import { Vector3, Quaternion, ReadOnlyVector3, ReadOnlyQuaternion } from '../decentraland-ecs/src/decentraland/math'
import { DEBUG, ENGINE_DEBUG_PANEL, SCENE_DEBUG_PANEL, EDITOR, parcelLimits, playerConfigurations } from '../config'
import { chatObservable } from '../shared/comms/chat'
import { queueTrackingEvent } from '../shared/analytics'
import { getUserProfile } from '../shared/comms/peers'
import { sceneLifeCycleObservable } from '../decentraland-loader/lifecycle/controllers/scene'
import { worldRunningObservable } from '../shared/world/worldState'

let gameInstance!: GameInstance

export let futures: Record<string, IFuture<any>> = {}

const positionEvent = {
  position: Vector3.Zero(),
  quaternion: Quaternion.Identity,
  rotation: Vector3.Zero(),
  playerHeight: playerConfigurations.height,
  mousePosition: Vector3.Zero()
}

/////////////////////////////////// HANDLERS ///////////////////////////////////

const browserInterface = {
  /** Triggered when the camera moves */
  ReportPosition(data: { position: ReadOnlyVector3; rotation: ReadOnlyQuaternion; playerHeight?: number }) {
    positionEvent.position.set(data.position.x, data.position.y, data.position.z)
    positionEvent.quaternion.set(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w)
    positionEvent.rotation.copyFrom(positionEvent.quaternion.eulerAngles)
    positionEvent.playerHeight = data.playerHeight || playerConfigurations.height
    positionObservable.notifyObservers(positionEvent)
  },

  ReportMousePosition(data: { id: string; mousePosition: ReadOnlyVector3 }) {
    console.log('ReportMousePosition:' + data.mousePosition)
    positionEvent.mousePosition.set(data.mousePosition.x, data.mousePosition.y, data.mousePosition.z)
    positionObservable.notifyObservers(positionEvent)
    futures[data.id].resolve(data.mousePosition)
  },

  SceneEvent(data: { sceneId: string; eventType: string; payload: any }) {
    const scene = getSceneWorkerBySceneID(data.sceneId)

    if (scene) {
      const parcelScene = scene.parcelScene as UnityParcelScene
      parcelScene.emit(data.eventType as IEventNames, data.payload)
    } else {
      defaultLogger.error(`SceneEvent: Scene ${data.sceneId} not found`, data)
    }
  },

  PreloadFinished(data: { sceneId: string }) {
    // stub. there is no code about this in unity side yet
  },

  ControlEvent({ eventType, payload }: { eventType: string; payload: any }) {
    switch (eventType) {
      case 'SceneReady': {
        const { sceneId } = payload
        sceneLifeCycleObservable.notifyObservers({ sceneId, status: 'ready' })
        break
      }
      case 'ActivateRenderingACK': {
        worldRunningObservable.notifyObservers(true)
        break
      }
      default: {
        defaultLogger.warn(`Unknown event type ${eventType}, ignoring`)
        break
      }
    }
  },

  SendScreenshot(data: { id: string; encodedTexture: string }) {
    futures[data.id].resolve(data.encodedTexture)
  }
}

function setLoadingScreenVisible(shouldShow: boolean) {
  document.getElementById('overlay')!.style.display = shouldShow ? 'block' : 'none'
  document.getElementById('progress-bar')!.style.display = shouldShow ? 'block' : 'none'
}

export const unityInterface = {
  debug: false,
  SetDebug() {
    gameInstance.SendMessage('SceneController', 'SetDebug')
  },
  LoadProfile(profile: Profile) {
    gameInstance.SendMessage('SceneController', 'LoadProfile', JSON.stringify(profile))
  },
  CreateUIScene(data: { id: string; baseUrl: string }) {
    /**
     * UI Scenes are scenes that does not check any limit or boundary. The
     * position is fixed at 0,0 and they are universe-wide. An example of this
     * kind of scenes is the Avatar scene. All the avatars are just GLTFs in
     * a scene.
     */
    gameInstance.SendMessage('SceneController', 'CreateUIScene', JSON.stringify(data))
  },
  /** Sends the camera position to the engine */
  SetPosition(x: number, y: number, z: number) {
    let theY = y <= 0 ? 2 : y

    gameInstance.SendMessage('CharacterController', 'SetPosition', JSON.stringify({ x, y: theY, z }))
  },
  /** Tells the engine which scenes to load */
  LoadParcelScenes(parcelsToLoad: LoadableParcelScene[]) {
    if (parcelsToLoad.length > 1) {
      throw new Error('Only one scene at a time!')
    }
    gameInstance.SendMessage('SceneController', 'LoadParcelScenes', JSON.stringify(parcelsToLoad[0]))
  },
  UpdateParcelScenes(parcelsToLoad: LoadableParcelScene[]) {
    if (parcelsToLoad.length > 1) {
      throw new Error('Only one scene at a time!')
    }
    gameInstance.SendMessage('SceneController', 'UpdateParcelScenes', JSON.stringify(parcelsToLoad[0]))
  },
  UnloadScene(sceneId: string) {
    gameInstance.SendMessage('SceneController', 'UnloadScene', sceneId)
  },
  SendSceneMessage(parcelSceneId: string, method: string, payload: string, tag: string = '') {
    if (unityInterface.debug) {
      defaultLogger.info(parcelSceneId, method, payload, tag)
    }
    gameInstance.SendMessage(`SceneController`, `SendSceneMessage`, `${parcelSceneId}\t${method}\t${payload}\t${tag}`)
  },

  SetSceneDebugPanel() {
    gameInstance.SendMessage('SceneController', 'SetSceneDebugPanel')
  },

  SetEngineDebugPanel() {
    gameInstance.SendMessage('SceneController', 'SetEngineDebugPanel')
  },

  sendBuilderMessage(method: string, payload: string = '') {
    gameInstance.SendMessage(`BuilderController`, method, payload)
  },

  ActivateRendering() {
    gameInstance.SendMessage('SceneController', 'ActivateRendering')
  },

  DeactivateRendering() {
    gameInstance.SendMessage('SceneController', 'DeactivateRendering')
  },

  UnlockCursor() {
    gameInstance.SendMessage('MouseCatcher', 'UnlockCursor')
  },

  SetBuilderReady() {
    gameInstance.SendMessage('SceneController', 'BuilderReady')
  }
}

window['unityInterface'] = unityInterface

////////////////////////////////////////////////////////////////////////////////

class UnityScene<T> implements ParcelSceneAPI {
  eventDispatcher = new EventDispatcher()
  worker!: SceneWorker
  logger: ILogger

  constructor(public data: EnvironmentData<T>) {
    this.logger = createLogger(getParcelSceneID(this) + ': ')
  }

  sendBatch(actions: EntityAction[]): void {
    const sceneId = getParcelSceneID(this)
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i]
      unityInterface.SendSceneMessage(sceneId, action.type, action.payload, action.tag)
    }
  }

  registerWorker(worker: SceneWorker): void {
    this.worker = worker
  }

  dispose(): void {
    // TODO: do we need to release some resource after releasing a scene worker?
  }

  on<T extends IEventNames>(event: T, cb: (event: IEvents[T]) => void): void {
    this.eventDispatcher.on(event, cb)
  }

  emit<T extends IEventNames>(event: T, data: IEvents[T]): void {
    this.eventDispatcher.emit(event, data)
  }
}

export class UnityParcelScene extends UnityScene<LoadableParcelScene> {
  constructor(public data: EnvironmentData<LoadableParcelScene>) {
    super(data)
    this.logger = createLogger(data.data.basePosition.x + ',' + data.data.basePosition.y + ': ')
  }

  registerWorker(worker: SceneWorker): void {
    super.registerWorker(worker)

    gridToWorld(this.data.data.basePosition.x, this.data.data.basePosition.y, worker.position)

    this.worker.system
      .then(system => {
        system.getAPIInstance(DevTools).logger = this.logger

        const parcelIdentity = system.getAPIInstance(ParcelIdentity)
        parcelIdentity.land = this.data.data.land
        parcelIdentity.cid = getParcelSceneID(worker.parcelScene)
      })
      .catch(e => this.logger.error('Error initializing system', e))
  }
}

////////////////////////////////////////////////////////////////////////////////

export async function initializeEngine(_gameInstance: GameInstance) {
  gameInstance = _gameInstance

  setLoadingScreenVisible(true)

  unityInterface.SetPosition(lastPlayerPosition.x, lastPlayerPosition.y, lastPlayerPosition.z)
  unityInterface.DeactivateRendering()

  if (DEBUG) {
    unityInterface.SetDebug()
  }

  if (SCENE_DEBUG_PANEL) {
    unityInterface.SetSceneDebugPanel()
  }

  if (ENGINE_DEBUG_PANEL) {
    unityInterface.SetEngineDebugPanel()
  }
  if (!EDITOR) {
    await initializeDecentralandUI()
  }
  return {
    unityInterface,
    onMessage(type: string, message: any) {
      if (type in browserInterface) {
        // tslint:disable-next-line:semicolon
        ;(browserInterface as any)[type](message)
      } else {
        defaultLogger.info('MessageFromEngine', type, message)
      }
    }
  }
}

/**
 * Initialize scenes loading worker
 * OPTIONAL: mock the download manager at @param downloaderManager for example
 * for not using content server. `editor.ts` entrypoint is using it
 */
export async function startUnityParcelLoading(downloadManager?: SceneDataDownloadManager) {
  await enableParcelSceneLoading({
    parcelSceneClass: UnityParcelScene,
    downloadManager,
    preloadScene: async _land => {
      // TODO:
      // 1) implement preload call
      // 2) await for preload message or timeout
      // 3) return
    },
    onSpawnpoint: initialLand => {
      const newPosition = getWorldSpawnpoint(initialLand)
      unityInterface.SetPosition(newPosition.x, newPosition.y, newPosition.z)
      queueTrackingEvent('Scene Spawn', { parcel: initialLand.scene.scene.base, spawnpoint: newPosition })
    },
    onLoadParcelScenes: lands => {
      unityInterface.LoadParcelScenes(
        lands.map($ => {
          const x = Object.assign({}, ILandToLoadableParcelScene($).data)
          delete x.land
          return x
        })
      )
    },
    onUnloadParcelScenes: lands => {
      lands.forEach($ => {
        unityInterface.UnloadScene($.sceneId)
      })
    },
    onPositionSettled: () => {
      unityInterface.ActivateRendering()
    },
    onPositionUnsettled: () => {
      setLoadingScreenVisible(true)
      unityInterface.DeactivateRendering()
    }
  })
}

async function initializeDecentralandUI() {
  const sceneId = 'dcl-ui-scene'

  const scene = new UnityScene({
    sceneId,
    baseUrl: location.origin,
    main: hudWorkerUrl,
    data: {},
    mappings: []
  })

  const worker = loadParcelScene(scene)
  worker.persistent = true

  await ensureUiApis(worker)

  unityInterface.CreateUIScene({ id: getParcelSceneID(scene), baseUrl: scene.data.baseUrl })
  unityInterface.LoadProfile(getUserProfile().profile)
}

// Builder functions

export function selectGizmoBuilder(type: string) {
  unityInterface.sendBuilderMessage('SelectGizmo', type)
}

export function resetObject() {
  unityInterface.sendBuilderMessage('ResetObject')
}

export function setCameraZoomDeltaBuilder(delta: number) {
  unityInterface.sendBuilderMessage('ZoomDelta', delta.toString())
}

export function getCameraTargetBuilder() {
  return positionEvent.position
}

export function setPlayModeBuilder(on: string) {
  unityInterface.sendBuilderMessage('SetPlayMode', on)
}

export function getMouseWorldPositionBuilder() {
  return positionEvent.mousePosition
}

export function preloadFileBuilder(url: string) {
  unityInterface.sendBuilderMessage('PreloadFile', url)
}

export function getMousePositionBuilder(x: string, y: string, id: string) {
  unityInterface.sendBuilderMessage('GetMousePosition', `{"x":"${x}", "y": "${y}", "id": "${id}" }`)
}

export function takeScreenshotBuilder(id: string) {
  unityInterface.sendBuilderMessage('TakeScreenshot', id)
}

export function setCameraPositionBuilder(position: Vector3) {
  unityInterface.sendBuilderMessage('SetBuilderCameraPosition', position.x + ',' + position.y + ',' + position.z)
}

export function setCameraRotationBuilder(aplha: number, beta: number) {
  unityInterface.sendBuilderMessage('SetBuilderCameraRotation', aplha + ',' + beta)
}

export function resetCameraZoomBuilder() {
  unityInterface.sendBuilderMessage('ResetBuilderCameraZoom')
}

export function ActivateRendering() {
  unityInterface.ActivateRendering()
}

export function DeactivateRendering() {
  unityInterface.DeactivateRendering()
}

export function UnloadScene(sceneId: string) {
  unityInterface.UnloadScene(sceneId)
}

export function setBuilderGridResolution(position: number, rotation: number, scale: number) {
  unityInterface.sendBuilderMessage(
    'SetGridResolution',
    JSON.stringify({ position: position, rotation: rotation, scale: scale })
  )
}

let currentLoadedScene: SceneWorker | null

export async function loadPreviewScene() {
  const result = await fetch('/scene.json?nocache=' + Math.random())

  let lastId: string | null = null

  if (currentLoadedScene) {
    lastId = currentLoadedScene.parcelScene.data.sceneId
    stopParcelSceneWorker(currentLoadedScene)
  }

  if (result.ok) {
    // we load the scene to get the metadata
    // about rhe bounds and position of the scene
    // TODO(fmiras): Validate scene according to https://github.com/decentraland/proposals/blob/master/dsp/0020.mediawiki
    const scene = (await result.json()) as IScene
    const mappingsFetch = await fetch('/mappings')
    const mappingsResponse = (await mappingsFetch.json()) as MappingsResponse

    let defaultScene: ILand = {
      sceneId: 'previewScene',
      baseUrl: location.toString().replace(/\?[^\n]+/g, ''),
      scene,
      mappingsResponse: mappingsResponse
    }

    const parcelScene = new UnityParcelScene(ILandToLoadableParcelScene(defaultScene))
    currentLoadedScene = loadParcelScene(parcelScene)

    const target: LoadableParcelScene = { ...ILandToLoadableParcelScene(defaultScene).data }
    delete target.land

    defaultLogger.info('Reloading scene...')

    if (lastId) {
      unityInterface.UnloadScene(lastId)
    }

    unityInterface.LoadParcelScenes([target])
  } else {
    throw new Error('Could not load scene.json')
  }
  defaultLogger.info('finish...')
}

export function loadBuilderScene(sceneData: ILand) {
  unloadCurrentBuilderScene()

  defaultLogger.info('Starting Builder Scene...')

  defaultLogger.info('mappings: ', sceneData.mappingsResponse)

  const parcelScene = new UnityParcelScene(ILandToLoadableParcelScene(sceneData))
  currentLoadedScene = loadParcelScene(parcelScene)

  const target: LoadableParcelScene = { ...ILandToLoadableParcelScene(sceneData).data }
  delete target.land

  unityInterface.LoadParcelScenes([target])
  return parcelScene
}

export function unloadCurrentBuilderScene() {
  if (currentLoadedScene) {
    const parcelScene = currentLoadedScene.parcelScene as UnityParcelScene
    parcelScene.emit('builderSceneUnloaded', {})

    stopParcelSceneWorker(currentLoadedScene)
    unityInterface.sendBuilderMessage('UnloadScene', parcelScene.data.sceneId)
    currentLoadedScene = null
  }
}

export function readyBuilderScene() {
  unityInterface.SetBuilderReady()
}

export function resetBuilderScene() {
  unityInterface.sendBuilderMessage('ResetBuilderScene')
}

export function updateBuilderScene(sceneData: ILand) {
  defaultLogger.info('Updating Builder Scene...')
  defaultLogger.info('mappings: ', sceneData.mappingsResponse)

  if (currentLoadedScene) {
    const target: LoadableParcelScene = { ...ILandToLoadableParcelSceneUpdate(sceneData).data }
    delete target.land
    unityInterface.UpdateParcelScenes([target])
  }
}

export function setBuilderArrowKeyDown(key: string) {
  unityInterface.sendBuilderMessage('SetArrowKeyDown', key)
}

teleportObservable.add((position: { x: number; y: number }) => {
  unityInterface.SetPosition(position.x * parcelLimits.parcelSize, 0, position.y * parcelLimits.parcelSize)
})

worldRunningObservable.add(isRunning => {
  if (isRunning) {
    setLoadingScreenVisible(false)
  }
})

window['messages'] = (e: any) => chatObservable.notifyObservers(e)

document.addEventListener('pointerlockchange', e => {
  if (!document.pointerLockElement) {
    unityInterface.UnlockCursor()
  }
})
