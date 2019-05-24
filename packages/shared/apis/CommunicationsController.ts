// tslint:disable:prefer-function-over-method
import { registerAPI, exposeMethod } from 'decentraland-rpc/lib/host'

import {
  sendParcelSceneCommsMessage,
  subscribeParcelSceneToCommsMessages,
  unsubscribeParcelSceneToCommsMessages
} from 'shared/comms'
import { ExposableAPI } from 'shared/apis/ExposableAPI'
import { EngineAPI } from 'shared/apis/EngineAPI'
import { ParcelIdentity } from './ParcelIdentity'
import { PeerInformation } from 'shared/comms/types'

@registerAPI('CommunicationsController')
export class CommunicationsController extends ExposableAPI {
  parcelIdentity = this.options.getAPIInstance(ParcelIdentity)
  engineAPI = this.options.getAPIInstance(EngineAPI)

  get cid() {
    return this.parcelIdentity.cid
  }

  apiDidMount() {
    // TODO: this is not working in decentraland-rpc
    // Subscribe this parcel to events
    subscribeParcelSceneToCommsMessages(this)
  }

  apiWillUnmount() {
    debugger
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
