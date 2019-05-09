import { Observable } from 'decentraland-ecs/src'

import { queueTrackingEvent } from 'shared/analytics'

export const ChatEvent = {
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  MESSAGE_SENT: 'MESSAGE_SENT'
}

export const chatObservable = new Observable()

chatObservable.add((event: any) => {
  console['log'](event)
  if (event.type === ChatEvent.MESSAGE_RECEIVED) {
    queueTrackingEvent('Chat message received', { lenght: event.data.message.lenght })
  } else if (event.type === ChatEvent.MESSAGE_SENT) {
    queueTrackingEvent('Send chat message', { messageId: event.data.messageId, length: event.data.message.length })
  }
})
