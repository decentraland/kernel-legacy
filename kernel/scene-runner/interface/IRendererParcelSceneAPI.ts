import { EnvironmentData, EntityAction } from '@dcl/utils'
import { ISceneWorker } from './ISceneWorker'

export interface IRendererParcelSceneAPI {
  data: EnvironmentData<any>
  sendBatch(actions: EntityAction[]): void
  registerWorker(worker: ISceneWorker): void
  dispose(): void
  on(event: string, cb: (event: any) => void): void
  off(event: string, cb: (event: any) => void): void
}
