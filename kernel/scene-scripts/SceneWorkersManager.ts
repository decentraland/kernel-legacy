import { ScriptingTransport, WebWorkerTransport } from '@dcl/rpc'
import { IWorker } from '@dcl/rpc/common/transports/WebWorker'
import { ISceneManifest } from '@dcl/utils'
import { IRendererParcelSceneAPI } from '../renderer/IRendererParcelSceneAPI'
import { MemoryRendererParcelScene } from '../renderer/mockRendererParcelScene'
import { ISceneWorker } from './interface/ISceneWorker'
import { SceneWorker } from './SceneWorker'

export type Data<T extends IWorker, R extends IRendererParcelSceneAPI> = {
  getWorker(): T
  getScene(): R
}

export class SceneWorkersManager {
  loadedSceneWorkers = new Map<string, ISceneWorker>()
  sceneManifests = new Map<string, ISceneManifest>()
  parcelSceneClass: any = MemoryRendererParcelScene

  newSceneWorker(scene: ISceneManifest, transport?: ScriptingTransport) {
    return new SceneWorker(new this.parcelSceneClass(scene), transport, './gamekit.js')
  }

  getSceneWorkerBySceneID(sceneId: string) {
    return this.loadedSceneWorkers.get(sceneId)
  }

  stopSceneWorker(scene: string | ISceneManifest) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.cannonicalCID)
    if (worker && !worker.persistent) {
      this._forceStopSceneWorker(worker)
    }
  }

  forceStopSceneWorker(scene: string | ISceneManifest) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.cannonicalCID)
    this._forceStopSceneWorker(worker)
  }

  private _forceStopSceneWorker(worker: ISceneWorker) {
    worker.dispose()
  }

  loadScene(scene: ISceneManifest, transport?: ScriptingTransport): ISceneWorker {
    const sceneId = scene.cannonicalCID

    let worker = this.loadedSceneWorkers.get(sceneId)
    if (!worker) {
      worker = this.newSceneWorker(scene, transport)
      this.loadedSceneWorkers.set(sceneId, worker)
      worker.onDisposeObservable.addOnce(() => {
        this.loadedSceneWorkers.delete(sceneId)
      })
    }
    return worker
  }
}
