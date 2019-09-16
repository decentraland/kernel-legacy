import { ExposableAPI, registerAPI } from '@dcl/rpc/host'
import { exposeMethod } from '@dcl/rpc/common/API'
import { EntityAction, IEventNames, IEvents } from '@dcl/scene-api'
import { IRendererParcelSceneAPI } from '../../renderer/IRendererParcelSceneAPI'

/**
 * The class formerly known as EngineAPI. Communicates the ParcelScene class on the Renderer with the corresponding
 * Scene Scripts running on workers and viceversa.
 */
@registerAPI('EngineAPI')
export class RendererParcelSceneToScript extends ExposableAPI {
  /**
   * Interface against the renderer
   */
  rendererParcelSceneAPI: IRendererParcelSceneAPI
  /**
   * List of subscribed events
   */
  subscribedEvents: Record<IEventNames, number> = {} as any
  /**
   * The listener associated with each event
   */
  listener: { [event: string]: (event: string, ...args: any[]) => void } = {}

  @exposeMethod
  async subscribe(event: IEventNames) {
    if (typeof (event as any) === 'string') {
      if (event in this.subscribedEvents) {
        this.subscribedEvents[event]++
        return
      }
      this.listener[event] = (data: any) => {
        if (this.subscribedEvents[event]) {
          this.sendSubscriptionEvent(event, data)
        }
      }
      this.rendererParcelSceneAPI.on(event, this.listener[event])
      this.subscribedEvents[event] = 1
    }
  }

  @exposeMethod
  async unsubscribe(event: string) {
    if (typeof (event as any) === 'string' && this.subscribedEvents[event] > 0) {
      this.subscribedEvents[event]--
      if (this.subscribedEvents[event] === 0) {
        this.rendererParcelSceneAPI.off(event, this.listener[event])
      }
    }
  }

  /**
   * Notify the Renderer of ECS Actions
   *
   * +---------------+          +--------------------+          +------------+
   * |               |          |     (kernel)       |          |            |
   * |   Scene ECS   | -------> | sendBatch(actions) | -------> |  Renderer  |
   * |               |          |   (you are here)   |          |            |
   * +---------------+          +--------------------+          +------------+
   */
  @exposeMethod
  async sendBatch(actions: EntityAction[]): Promise<void> {
    this.rendererParcelSceneAPI.sendBatch(actions)
  }

  @exposeMethod
  async startSignal(): Promise<void> {}

  /**
   * This is one of the most important functions of the project. This is the method that gets called by the renderer
   * whenever something that the user initiates happens.
   *
   * In other words, this carries over things like clicks so your scenes can be interactive.
   *
   * +--------------+          +-----------------------+          +-----------------------------+
   * |              |          |        (kernel)       |          |                             |
   * |   Renderer   | -------> | sendSubscriptionEvent | -------> | Scene Coded by Parcel Owner |
   * |              |          |     (you are here)    |          |                             |
   * +--------------+          +-----------------------+          +-----------------------------+
   */
  sendSubscriptionEvent<K extends IEventNames>(event: K, data: IEvents[K]) {
    if (this.subscribedEvents[event]) {
      this.options.notify('SubscribedEvent', { event, data })
    }
  }

  /**
   * @TODO (eordano 31/Aug/2019): Implement this -- make sure we're not leaking resources
   */
  apiWillUnmount() {}

  /**
   * This is empty because it's only used from the Scene.
   */
  onSubscribedEvent(fn: any): void {}
}
