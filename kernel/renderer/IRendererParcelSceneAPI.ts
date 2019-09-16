import { EntityAction, ISceneManifest } from '@dcl/utils'
import { ISceneWorker } from '../scene-scripts/interface/ISceneWorker'

/**
 * Renderer's API -- the kernel uses this interface to bootstrap a (RendererParcelScene) on the Renderer
 */
export interface IRendererParcelSceneAPI {
  sceneManifest: ISceneManifest
  sendBatch(actions: EntityAction[]): void
  registerWorker(worker: ISceneWorker): void
  dispose(): void
  on(event: string, cb: (event: any) => void): void
  off(event: string, cb: (event: any) => void): void
}
