import { APIOptions, exposeMethod, registerAPI, ExposableAPI } from '@dcl/rpc-host'
import { defaultLogger } from '@dcl/utils'
import { EntityAction } from '@dcl/utils/BagOfThings'
import { IEventsAPI } from './IEventsAPI'
import { IEventNames, IEvents } from '../runner/generateDCLInterface/node_modules/@dcl/scene-api'
import { IEventsManager } from './IEventsManager'

/**
 * This is the interface to handle queries from the scene scripts, but this runs on the main thread
 */
@registerAPI('EngineAPI')
export class SceneEventsManager extends ExposableAPI implements IEventsAPI, IEventsManager {
  parcelSceneAPI!: ParcelSceneAPI

  subscribedEventListeners: Partial<Record<IEventNames, (data: any) => void>> = {}

  constructor(options: APIOptions) {
    super(options)
  }

  /**
   * Called by the scene script to start receiving events of a particular kind
   * @param event name of the events the script is interested in receiving
   */
  @exposeMethod
  async subscribe(event: IEventNames) {
    if (typeof (event as any) !== 'string') {
      defaultLogger.warn('Tried to subscribe to events using an invalid event name')
      return
    }
    if (this.subscribedEventListeners[event]) {
      defaultLogger.info('Already subscribed to event', event)
      return
    }
    const eventListener = (data: any) => {
      this.sendSubscriptionEvent(event, data)
    }
    this.parcelSceneAPI.on(event, eventListener)
    this.subscribedEventListeners[event] = eventListener
  }

  /**
   * Called by the scene script to stop receiving updates on a particular subject
   * @param event event to unsubscribe from
   */
  @exposeMethod
  async unsubscribe(event: IEventNames) {
    if (typeof (event as any) !== 'string') {
      defaultLogger.warn('Tried to unsubscribe using an invalid event name')
      return
    }
    this.parcelSceneAPI.off(event, this.subscribedEventListeners[event])
    delete this.subscribedEventListeners[event]
  }

  /**
   * Called by the scene script once per update round. Contains all the ECS actions generated on this loop
   * @param actions the actions reported by the script on this loop
   */
  @exposeMethod
  async sendBatch(actions: EntityAction[]): Promise<void> {
    this.parcelSceneAPI.sendBatch(actions)
  }

  sendSubscriptionEvent<K extends IEventNames>(event: K, data: IEvents[K]) {
    if (this.subscribedEventListeners[event]) {
      this.options.notify('SubscribedEvent', {
        event,
        data
      })
    }
  }

  onSubscribedEvent(fn: any): void {
    // stub, we implement this function here to fulfill the interface of EngineAPI
  }
}
