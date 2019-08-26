import { ISceneCommsController } from './ISceneCommsController'
import { ChatData } from '@dcl/protos'

export class SceneMessageBusProvider {
  scenes: { [sceneId: string]: }
  activate() {
    this.
  }
}
export function sendParcelSceneCommsMessage(cid: string, message: string) {
  if (context && context.currentPosition && context.worldInstanceConnection) {
    context.worldInstanceConnection.sendParcelSceneCommsMessage(cid, message)
  }
}

export function subscribeParcelSceneToCommsMessages(controller: ISceneCommsController) {
  scenesSubscribedToCommsEvents.add(controller)
}

export function unsubscribeParcelSceneToCommsMessages(controller: ISceneCommsController) {
  scenesSubscribedToCommsEvents.delete(controller)
}

// TODO: Change ChatData to the new class once it is added to the .proto
export function processParcelSceneCommsMessage(context: any, fromAlias: string, data: ChatData) {
  const cid = data.getMessageId()
  const text = data.getText()

  const peer = getPeer(fromAlias)

  if (peer) {
    scenesSubscribedToCommsEvents.forEach($ => {
      if ($.cid === cid) {
        $.receiveCommsMessage(text, peer)
      }
    })
  }
}
