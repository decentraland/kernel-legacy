import { IEngine } from './IEngine'
export type ISystem = {
  activate(engine: IEngine): void
  onUpdate(dt: number): void
  onAddEntity?(entityId: string): any
  onRemoveEntity?(entityId: string): any
}
