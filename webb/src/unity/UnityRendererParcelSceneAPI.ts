import { EventDispatcher } from '@dcl/rpc/common/core/EventDispatcher'
import { IEventNames, IEvents } from '@dcl/scene-api'
import { createLogger, EntityAction, gridToWorld, ILogger, MVector3 } from '@dcl/utils'
import { IRendererParcelSceneAPI } from '~/kernel/renderer/IRendererParcelSceneAPI'
import { ISceneWorker } from '~/kernel/scene-scripts/interface/ISceneWorker'
import { SceneManifest } from '~/kernel/worldMap/scene'
import { UnityGlobals } from './globals'
import { DevTools } from '~/kernel/scene-scripts/kernelSpace/DevTools'

export class UnityRendererParcelSceneAPI implements IRendererParcelSceneAPI {
  eventDispatcher = new EventDispatcher()
  worker!: ISceneWorker
  position: MVector3
  logger: ILogger
  constructor(public sceneManifest: SceneManifest) {
    this.logger = createLogger(`${this.sceneManifest.baseParcel.x},${this.sceneManifest.baseParcel.y}`)
  }
  sendBatch(actions: EntityAction[]): Promise<void> {
    const sceneId = this.sceneManifest.id
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i]
      UnityGlobals.unityInterface.SendSceneMessage(sceneId, action.type, action.payload, action.tag)
    }
    return Promise.resolve()
  }
  registerWorker(worker: ISceneWorker): void {
    this.worker = worker
    gridToWorld(this.sceneManifest.baseParcel.x, this.sceneManifest.baseParcel.y, this.position)
    // this.worker.system.getAPIInstance(DevTools).logger = this.logger
    UnityGlobals.unityInterface.LoadParcelScene(this.sceneManifest)

    // TODO: Figure out what to do here with this deprecated API:
    // const parcelIdentity = system.getAPIInstance(ParcelIdentity)
    // parcelIdentity.land = this.data.data.land
    // parcelIdentity.cid = this.sceneManifest.id
  }
  dispose(): void {
    UnityGlobals.unityInterface.UnloadScene(this.sceneManifest.id)
  }
  on<T extends IEventNames>(event: T, cb: (event: IEvents[T]) => void): void {
    this.eventDispatcher.on(event, cb)
  }
  emit<T extends IEventNames>(event: T, data: IEvents[T]): void {
    this.eventDispatcher.emit(event, data)
  }
  off<T extends IEventNames>(event: T, cb: (event: IEvents[T]) => void): void {
    this.eventDispatcher.off(event, cb)
  }
}
