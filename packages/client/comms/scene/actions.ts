// import { SceneCommsController } from 'comms/scene/SceneCommsController'
//
// export function sendParcelSceneCommsMessage(cid: string, message: string) {
//   if (context && context.currentPosition && context.worldInstanceConnection) {
//     context.worldInstanceConnection.sendParcelSceneCommsMessage(cid, message)
//   }
// }
//
// export function subscribeParcelSceneToCommsMessages(controller: SceneCommsController) {
//   scenesSubscribedToCommsEvents.add(controller)
// }
//
// export function unsubscribeParcelSceneToCommsMessages(controller: SceneCommsController) {
//   scenesSubscribedToCommsEvents.delete(controller)
// }
//
// // TODO: Change ChatData to the new class once it is added to the .proto
// export function processParcelSceneCommsMessage(context: Context, fromAlias: string, data: ChatData) {
//   const cid = data.getMessageId()
//   const text = data.getText()
//
//   const peer = getPeer(fromAlias)
//
//   if (peer) {
//     scenesSubscribedToCommsEvents.forEach($ => {
//       if ($.cid === cid) {
//         $.receiveCommsMessage(text, peer)
//       }
//     })
//   }
// }
//
