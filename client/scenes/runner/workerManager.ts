import { ScriptingTransport } from '@dcl/rpc-common/json-rpc/types'
import { Observable } from '@dcl/utils'

import { Scene } from '../../worldMap/scene'

export class SceneWorker {
  scene: Scene
  transport: ScriptingTransport
  constructor(scene: Scene, transport: ScriptingTransport) {
    this.scene = scene
    this.transport = transport
  }
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}

export abstract class SceneRunner {
  loadedSceneWorkers = new Map<string, SceneWorker>()
  sceneManifests = new Map<string, Scene>()

  constructor() {}

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

  private _forceStopSceneWorker(worker: SceneWorker) {
    worker.dispose()
  }

  loadScene(scene: Scene, transport: ScriptingTransport) {
    const sceneId = scene.cannonicalCID

    let worker = this.loadedSceneWorkers.get(sceneId)
    if (!worker) {
      worker = new SceneWorker(scene, transport)
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
