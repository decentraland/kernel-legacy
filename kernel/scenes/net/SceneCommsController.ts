import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { exposeMethod, APIOptions } from '@dcl/rpc/common/API'

import { IEventsManager } from '../exposedApis/IEventsManager'
import { PeerInformation } from '../../comms/types/PeerInformation'

@registerAPI('CommunicationsController')
export class SceneCommsController extends ExposableAPI {
  constructor(public options: APIOptions) {
    super(options)
    // subscribeParcelSceneToCommsMessages(this)
  }

  engineAPI = (this.options.getAPIInstance('EngineAPI') as any) as IEventsManager

  get cid() {
    return '1' // this.sceneManifest.cannonicalCID
  }

  apiWillUnmount() {
    // Unsubscribe this parcel from events
    // unsubscribeParcelSceneToCommsMessages(this)
  }

  forwardNetworkToScript(message: string, sender: PeerInformation) {
    this.engineAPI.sendSubscriptionEvent('comms', {
      message,
      sender: sender.uuid
    })
  }

  @exposeMethod
  async send(message: string): Promise<void> {
    // checkAndForwardScriptToNetwork(this.cid, message)
  }
}
