export class SceneCommsController {}
// // tslint:disable:prefer-function-over-method
// import { registerAPI, exposeMethod, APIOptions } from 'dclrpc/lib/host'
//
// import {
//   sendParcelSceneCommsMessage,
//   subscribeParcelSceneToCommsMessages,
//   unsubscribeParcelSceneToCommsMessages
// } from './actions'
// import { EngineAPI } from 'dclscenes/EngineAPI'
// import { ParcelIdentity } from './ParcelIdentity'
// import { PeerInformation } from 'shared/comms/types'
//
// @registerAPI('CommunicationsController')
// export class SceneCommsController extends ExposableAPI {
//   parcelIdentity = this.options.getAPIInstance(ParcelIdentity) as SceneInformationProvider
//   engineAPI = this.options.getAPIInstance(EngineAPI)
//
//   get cid() {
//     return this.parcelIdentity.cid
//   }
//
//   constructor(public options: APIOptions) {
//     super(options)
//     subscribeParcelSceneToCommsMessages(this)
//   }
//
//   apiWillUnmount() {
//     // Unsubscribe this parcel from events
//     unsubscribeParcelSceneToCommsMessages(this)
//   }
//
//   receiveCommsMessage(message: string, sender: PeerInformation) {
//     this.engineAPI.sendSubscriptionEvent('comms', {
//       message,
//       sender: sender.uuid
//     })
//   }
//
//   @exposeMethod
//   async send(message: string): Promise<void> {
//     sendParcelSceneCommsMessage(this.cid, message)
//   }
// }
//
