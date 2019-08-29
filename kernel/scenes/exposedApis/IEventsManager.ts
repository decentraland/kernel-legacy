import { IEventNames, IEvents } from '@dcl/scene-api'

export interface IEventsManager {
  /**
   * Use this function to notify the running script of an event.
   * The script will receive the event iff it called `subscribe(eventName)`.
   * This causes `onSubscribedEvent` to be called on the worker script.
   */
  sendSubscriptionEvent<K extends IEventNames>(event: K, data: IEvents[K]): void
}
