import { ScriptingTransport, WebWorkerTransport } from '@dcl/rpc'
import { IWorker } from '@dcl/rpc/common/transports/WebWorker'
import { ISceneManifest } from '@dcl/utils'
import { IRendererParcelSceneAPI } from '../renderer/IRendererParcelSceneAPI'
import { MemoryRendererParcelScene } from '../renderer/mockRendererParcelScene'
import { urlGamekit } from './GamekitProvider'
import { SceneWorker } from './SceneWorker'

export type RendererParcelSceneProvider = (scene: ISceneManifest) => IRendererParcelSceneAPI

export const settings: {
  gamekitProvider: (data?: string) => string
  transportProvider: (data?: any) => ScriptingTransport
  rendererParcelScene: ((scene?: ISceneManifest) => IRendererParcelSceneAPI) | null
} = {
  gamekitProvider: urlGamekit,
  transportProvider: (worker: IWorker) => WebWorkerTransport(worker),
  rendererParcelScene: scene => new MemoryRendererParcelScene(scene)
}

export const SceneWorkerFactory = {
  newSceneWorker(scene: ISceneManifest, transport?: ScriptingTransport) {
    if (!settings.rendererParcelScene) {
      throw new Error('Misconfigured kernel: Please provide a RendererParcelScene provider in `SceneWorkerFactory`')
    }
    return new SceneWorker(
      settings.rendererParcelScene(scene),
      transport || this.transportProvider,
      settings.gamekitProvider()
    )
  }
}
