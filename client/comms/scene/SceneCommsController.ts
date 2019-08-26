import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { exposeMethod, APIOptions } from '@dcl/rpc/common/API'

import {
  sendParcelSceneCommsMessage,
  subscribeParcelSceneToCommsMessages,
  unsubscribeParcelSceneToCommsMessages
} from './SceneToSceneComms'

import { EngineAPI } from '@dcl/scenes-api/EngineAPI'
import { PeerInformation } from 'shared/comms/types'

@registerAPI('CommunicationsController')
export class SceneCommsController extends ExposableAPI {
  sceneInfo = this.options.getAPIInstance(SceneInformationProvider) as SceneInformationProvider
  engineAPI = this.options.getAPIInstance(EngineAPI)

  get cid() {
    return this.sceneManifest.cannonicalCID
  }

  constructor(public options: APIOptions) {
    super(options)
    subscribeParcelSceneToCommsMessages(this)
  }

  apiWillUnmount() {
    // Unsubscribe this parcel from events
    unsubscribeParcelSceneToCommsMessages(this)
  }

  receiveCommsMessage(message: string, sender: PeerInformation) {
    this.engineAPI.sendSubscriptionEvent('comms', {
      message,
      sender: sender.uuid
    })
  }

  @exposeMethod
  async send(message: string): Promise<void> {
    sendParcelSceneCommsMessage(this.cid, message)
  }
}
