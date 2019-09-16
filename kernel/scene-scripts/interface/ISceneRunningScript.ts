import { EntityAction } from '@dcl/utils'

/**
 * We make this interface explicit not because we need it, but because changing it might make some users to report that
 * their scenes stopped working. Remember that the Gamekit is code that we provide on each new build -- and the scene
 * script is likely to remain over time. That's also the reason for this to be outside of the `userSpace` folder.
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
