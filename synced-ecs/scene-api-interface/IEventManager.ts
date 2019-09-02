import { IEvent } from './IEvent'

export interface IEventManager {
  addListener: (messageType: string, that: any, handler: (event: IEvent) => void) => void
}
