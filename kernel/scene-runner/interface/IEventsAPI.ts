import { IEventNames } from '../userSpace/node_modules/@dcl/scene-api'
import { IECSActionsReporting } from './IECSActionsAPI'

export interface IEventsAPI extends IECSActionsReporting {
  /**
   * Subscribes to events dispatched by the EngineAPI
   * Scripts use it to listen to events from the scene (like `click`)
   * @param event
   */
  subscribe(event: IEventNames): Promise<void>

  /**
   * Removes a subscription to an event
   * @see IEventsAPI.subscribe
   * @param event
   */
  unsubscribe(event: IEventNames): Promise<void>

  /**
   * After calling subscribe, this is the function used to register an event handler
   * @param fn
   */
  onSubscribedEvent(fn: (event: IEventNames, data: any) => void): void
}
