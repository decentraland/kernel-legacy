import { EntityAction } from '@dcl/utils'
import { EventSubscriber } from '@dcl/rpc/client'

export interface ISceneRunningScript {
  onLog: (...args: any) => void
  onError: (...args: any) => void
  onUpdateFunctions: Function[]
  onEventFunctions: Function[]
  onStartFunctions: Function[]
  fireEvent: any
  eventSubscriber: EventSubscriber
  events: EntityAction[]
}
