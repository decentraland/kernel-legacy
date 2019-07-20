import { Observable } from '@dcl/utils/dist/Observable'
import { MessageEntry } from '@dcl/utils/dist/Comms'

export enum ChatEvent {
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  MESSAGE_SENT = 'MESSAGE_SENT'
}

export const chatObservable = new Observable<{
  type: ChatEvent
  messageEntry: MessageEntry
}>()
