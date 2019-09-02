import { IEngine } from './IEngine'

export interface DecentralandInterface {
  engine: IEngine
  subscribe(topic: string): void
  onEvent(handler: Function): void
}
