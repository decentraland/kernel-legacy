import { ScriptingTransport } from '@dcl/rpc-common/json-rpc/types'

import { Scene } from '../../worldMap/scene'
import { ISceneWorker } from '../types/ISceneWorker'
import { SceneManifest } from 'client/worldMap/scene/scene'

export abstract class SceneWorkersManager {
  loadedSceneWorkers = new Map<string, ISceneWorker>()
  sceneManifests = new Map<string, Scene>()

  constructor(public bootstrapScene: (scene: SceneManifest, transport: ScriptingTransport) => ISceneWorker) {}

  getSceneWorkerBySceneID(sceneId: string) {
    return this.loadedSceneWorkers.get(sceneId)
  }

  stopSceneWorker(scene: string | Scene) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.cannonicalCID)
    if (worker && !worker.persistent) {
      this._forceStopSceneWorker(worker)
    }
  }

  forceStopSceneWorker(scene: string | Scene) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.cannonicalCID)
    this._forceStopSceneWorker(worker)
  }

  private _forceStopSceneWorker(worker: ISceneWorker) {
    worker.dispose()
  }

  loadScene(scene: Scene, transport: ScriptingTransport) {
    const sceneId = scene.cannonicalCID

    let worker = this.loadedSceneWorkers.get(sceneId)
    if (!worker) {
      worker = this.bootstrapScene(scene, transport)
      this.loadedSceneWorkers.set(sceneId, worker)
      worker.onDisposeObservable.addOnce(() => {
        this.loadedSceneWorkers.delete(sceneId)
      })
    }
    return worker
  }

  abstract onSceneAwake(scene: Scene)
  abstract onSceneWillStart(scene: Scene)
  abstract onSceneRunning(scene: Scene)
  abstract onSceneWillUnload(scene: Scene)
  abstract onSceneDidUnload(scene: Scene)
}
