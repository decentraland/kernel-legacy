import future from 'fp-future'

import { ScriptingHost, ScriptingTransport, WebWorkerTransport } from '@dcl/rpc'
import { Observable, ISceneManifest } from '@dcl/utils'
import { createLogger } from '@dcl/utils'

import { IRendererParcelSceneAPI } from './interface/IRendererParcelSceneAPI'
import { ISceneWorker } from './interface/ISceneWorker'
import { SceneStatus } from './SceneStatus'
import { RendererParcelSceneToScript } from './kernelSpace/RendererParcelSceneToScript'
import { EnvironmentAPI } from './kernelSpace/EnvironmentAPI'

const logger = createLogger('SceneWorker')

const gamekitWorkerRaw = require('raw-loader!../../../static/systems/scene.system.js')
const gamekitWorkerBLOB = new Blob([gamekitWorkerRaw])
const gamekitWorkerUrl = URL.createObjectURL(gamekitWorkerBLOB)

export class SceneWorker implements ISceneWorker {
  public readonly system = future<ScriptingHost>()

  public engineAPI: RendererParcelSceneToScript
  public enabled = true

  public persistent = false
  public readonly onDisposeObservable = new Observable<string>()

  public transport: ScriptingTransport
  public sceneState: SceneStatus = 'loading'
  public scene: ISceneManifest

  constructor(public parcelScene: IRendererParcelSceneAPI, transport?: ScriptingTransport) {
    this.scene = parcelScene.scene
    this.transport = transport!
    parcelScene.registerWorker(this)

    this.loadSystem(transport)
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

      this.onDisposeObservable.notifyObservers(this.scene.cannonicalCID)
    }
  }

  private async startSystem(transport: ScriptingTransport) {
    const system = await ScriptingHost.fromTransport(transport)

    this.engineAPI = (system.getAPIInstance('EngineAPI') as any) as RendererParcelSceneToScript
    this.engineAPI.rendererParcelSceneAPI = this.parcelScene

    system.getAPIInstance(EnvironmentAPI).data = this.parcelScene.data

    system.enable()

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
