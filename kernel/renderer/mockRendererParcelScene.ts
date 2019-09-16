import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'
import { ScriptingHost } from '@dcl/rpc/host'
import { IRendererParcelSceneAPI } from './IRendererParcelSceneAPI'
import { EventEmitter } from 'events'

/**
 * Use this as a mock for a Renderer's Parcel Scene behavior if there is no renderer connected
 */
export class MemoryRendererParcelScene extends EventEmitter implements IRendererParcelSceneAPI {
  public worker: ISceneWorker
  public system: ScriptingHost
  public sceneManifest: any
  sendBatch(actions: any[]): void {
    console.log('Events from', this.sceneManifest.id, actions)
    if (Array.isArray(actions)) {
      if (actions.reduce((finished, action) => finished || action.type === 'InitMessagesFinished', false)) {
        if (this.system) {
          this.system.emit('awake')
          // Emulating load of scene
          setTimeout(() => this.system.emit('loaded'), Math.random() * 2000)
        }
      }
    }
  }
  async registerWorker(worker: ISceneWorker): Promise<void> {
    this.worker = worker;
    try {
      // TODO (eordano): fixme
      await (worker as any).systemPromise
    } catch (error) {
      console.log(error)
      this.dispose
    }
    console.log('Registered worker', worker.sceneManifest.id)
  }
  dispose(): void {
    console.log('Disposing worker')
  }
  constructor(scene: any) {
    super()
    this.sceneManifest = scene
  }
}
