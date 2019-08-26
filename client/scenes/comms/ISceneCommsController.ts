import { PeerInformation } from '@dcl/client/comms/types';

@registerAPI('CommsController')
export interface ISceneCommsController {
  cid: string
  notify(messagePayload: string, sender: PeerInformation): void
  sendPing(message: string): Promise<void>

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
