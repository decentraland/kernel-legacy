import { ScriptingHost, ScriptingTransport, WebWorkerTransport } from '@dcl/rpc'
import { EntityAction, Observable, Observer, Vector3 } from '@dcl/utils'
import future from 'fp-future'
import { IECSActionsReporting } from './interface/IECSActionsAPI'
import { createLogger } from 'utils'
import { IECSEngine } from '@dcl/scene-api'
import { IEventsAPI } from './interface/IEventsAPI'
import { IEventsManager } from './interface/IEventsManager'
import { SceneWorkerCameraState } from './kernelSpace/SceneWorkerCameraState'

export type ParcelSceneAPI = {
  data: any
  sendBatch(actions: EntityAction[]): void
  registerWorker(event: SceneWorker): void
  dispose(): void
  on(event: string, cb: (event: any) => void): void
}

const logger = createLogger('SceneWorker')

export interface SceneWorkerMainState {
  // If true, there have been no exceptions in the normal scene lifecycle of this parcel
  enabled: boolean
  // If true, this parcel can not be unloaded
  persistent: boolean
}

// These 4 booleans are exclusive! Consider simplifying to an enum?
export interface SceneWorkerLifecycleState {
  // No 'start' event triggered -- likely to be loading the initial script
  sceneLoading: boolean
  // Start event triggered -- just waiting for update calls to be enabled!
  sceneAwake: boolean
  // Scene up & running!
  sceneRunning: boolean
  // Errored heavy :(
  sceneErrored: boolean
}

export interface SceneWorkerSubscribedEvents {
  // Events the worker subscribed to
  subscribedEvents: string[]
}

export type SceneWorkerState = SceneWorkerMainState &
  SceneWorkerLifecycleState &
  SceneWorkerCameraState &
  SceneWorkerSubscribedEvents

export class SceneWorker {
  public readonly system = future<ScriptingHost>()

  public engineAPI: IECSActionsReporting & IECSEngine & IEventsAPI & IEventsManager | null = null
  public enabled = true

  public persistent = false
  public readonly onDisposeObservable = new Observable<SceneWorker>()

  public sceneStarted: boolean = false

  public positionObserver: Observer<any> | null = null
  public sceneLifeCycleObserver: Observer<any> | null = null
  public worldRunningObserver: Observer<any> | null = null

  private sceneReady: boolean = false

  constructor(public parcelScene: ParcelSceneAPI, transport?: ScriptingTransport) {
    parcelScene.registerWorker(this)

    this.subscribeToSceneLifeCycleEvents()
    this.subscribeToWorldRunningEvents()

    this.loadSystem(transport)
      .then($ => this.system.resolve($))
      .catch($ => this.system.reject($))
  }

  dispose() {
    if (this.enabled) {
      this.enabled = false

      // Unmount the system
      if (this.system) {
        this.system.then(() => this.unmountSystem()).catch(e => logger.error('Unable to unmount system', e))
      }

      this.parcelScene.dispose()

      this.onDisposeObservable.notifyObservers(this)
    }
  }

  private subscribeToPositionEvents() {
    const position = Vector2.Zero()

    this.positionObserver = positionObservable.add(obj => {
      worldToGrid(obj.position, position)

      this.sendUserViewMatrix(obj)
    })
  }

  private subscribeToWorldRunningEvents() {
    this.worldRunningObserver = worldRunningObservable.add(isRunning => {
      this.sendSceneReadyIfNecessary()
    })
  }

  private subscribeToSceneLifeCycleEvents() {
    this.sceneLifeCycleObserver = sceneLifeCycleObservable.add(obj => {
      if (this.parcelScene.data.sceneId === obj.sceneId && obj.status === 'ready') {
        this.sceneReady = true
        sceneLifeCycleObservable.remove(this.sceneLifeCycleObserver)
        this.sendSceneReadyIfNecessary()
      }
    })
  }

  private sendSceneReadyIfNecessary() {
    if (!this.sceneStarted && isWorldRunning() && this.sceneReady) {
      this.sceneStarted = true
      this.engineAPI!.sendSubscriptionEvent('sceneStart', {})
      worldRunningObservable.remove(this.worldRunningObserver)
    }
  }

  private async startSystem(transport: ScriptingTransport) {
    const system = await ScriptingHost.fromTransport(transport)

    this.engineAPI = system.getAPIInstance('EngineAPI') as EngineAPI
    this.engineAPI.parcelSceneAPI = this.parcelScene

    system.getAPIInstance(EnvironmentAPI).data = this.parcelScene.data

    system.enable()

    this.subscribeToPositionEvents()

    return system
  }

  private async loadSystem(transport?: ScriptingTransport): Promise<ScriptingHost> {
    const worker = new (Worker as any)(gamekitWorkerUrl, {
      name: `ParcelSceneWorker(${this.parcelScene.data.sceneId})`
    })
    return this.startSystem(transport || WebWorkerTransport(worker))
  }

  unmountSystem() {
    this.system.then(system => system.unmount()).catch(e => logger.error('Error unmounting system', e))
  }
}
