import { ScriptingHost, ScriptingTransport, WebWorkerTransport } from '@dcl/rpc'
import { createLogger, ISceneManifest, Observable } from '@dcl/utils'
import future, { IFuture } from 'fp-future'
import { IRendererParcelSceneAPI } from '../renderer/IRendererParcelSceneAPI'
import { ISceneWorker } from './interface/ISceneWorker'
import { SceneStatus } from './SceneStatus'

import { DevTools } from './kernelSpace/DevTools'
import { EnvironmentAPI } from './kernelSpace/EnvironmentAPI'
import { RendererParcelSceneToScript } from './kernelSpace/RendererParcelSceneToScript'

{
  ;[EnvironmentAPI, RendererParcelSceneToScript, DevTools].map(api =>
    console.log('Loaded API accessible by scripts:', api.name, name)
  )
}

const logger = createLogger('SceneWorker')

export class SceneWorker implements ISceneWorker {
  public system: IFuture<ScriptingHost> = future<ScriptingHost>()

  public engineAPI: RendererParcelSceneToScript
  public enabled = true

  public persistent = false
  public readonly onDisposeObservable = new Observable<string>()

  public transport: ScriptingTransport
  public sceneState: SceneStatus = 'loading'
  public sceneManifest: ISceneManifest

  constructor(public parcelScene: IRendererParcelSceneAPI, transport: ScriptingTransport, gamekit?: string) {
    this.sceneManifest = parcelScene.sceneManifest
    parcelScene.registerWorker(this)

    this.loadSystem(transport, gamekit)
      .then($ => this.system.resolve($))
      .catch($ => this.system.reject($))
  }

  dispose() {
    if (this.enabled) {
      this.enabled = false
      this.sceneState = 'stopped'

      // Unmount the system
      if (this.system) {
        this.system.then(() => this.unmountSystem()).catch(e => logger.error('Unable to unmount system', e))
      }

      this.parcelScene.dispose()

      this.onDisposeObservable.notifyObservers(this.sceneManifest.cannonicalCID)
    }
  }

  private async startSystem(transport: ScriptingTransport) {
    const system = await ScriptingHost.fromTransport(transport)
    this.transport = transport

    this.engineAPI = system.getAPIInstance('EngineAPI')
    this.engineAPI.rendererParcelSceneAPI = this.parcelScene

    system.getAPIInstance(EnvironmentAPI).sceneManifest = this.parcelScene.sceneManifest

    system.enable()

    return system
  }

  private async loadSystem(transport?: ScriptingTransport, gamekit?: string): Promise<ScriptingHost> {
    if (!gamekit) {
      throw new Error(
        `Can't create a SceneWorker without the Gamekit Entrypoint. See SceneWorker.ts for more information`
      )
    }
    const worker = new (Worker as any)(gamekit, {
      name: `ParcelSceneWorker(${this.parcelScene.sceneManifest.sceneId})`
    })
    return this.startSystem(transport || WebWorkerTransport(worker))
  }

  unmountSystem() {
    this.system.then(system => system.unmount()).catch(e => logger.error('Error unmounting system', e))
  }
}
