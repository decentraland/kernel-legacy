import { WebWorkerTransport, ScriptingTransport } from '@dcl/rpc'
import { ISceneManifest } from '@dcl/utils'
import { IWorker } from '@dcl/rpc/common/transports/WebWorker'
import { SceneWorker } from './SceneWorker'
import { urlGamekit } from './GamekitProvider'
import { IRendererParcelSceneAPI } from '../renderer/IRendererParcelSceneAPI'

export type RendererParcelSceneProvider = (scene: ISceneManifest) => IRendererParcelSceneAPI

export const settings: {
  gamekitProvider: (data?: string) => string
  transportProvider: (data?: any) => ScriptingTransport
  rendererParcelScene: ((scene?: ISceneManifest) => IRendererParcelSceneAPI) | null
} = {
  gamekitProvider: urlGamekit,
  transportProvider: (worker: IWorker) => WebWorkerTransport(worker),
  rendererParcelScene: null
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
