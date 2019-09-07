import { EntityAction } from '@dcl/utils'

/**
 * This can not be accessed from the kernel. It's the GamekitScript's Interface, meaning, this is called by the scene.
 */
export interface ISceneRunningScript {
  onLog: (...args: any) => void
  onError: (...args: any) => void
  onUpdateFunctions: Function[]
  onEventFunctions: Function[]
  onStartFunctions: Function[]
  fireEvent: any
  outboundEventQueue: EntityAction[]
}
