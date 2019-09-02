import { IMessageBus } from '../scene-api-interface/IMessageBus'

export class MessageBus implements IMessageBus {
  listeners: { [key: string]: Function[] } = {}
  emit(messageType: string, payload: { [key: string]: any }) {
    const listenng = this.listeners[messageType]
    if (!listenng) return
    for (let i of listenng) {
      try {
        i(messageType, payload)
      } catch (e) {
        console.log(`listener ${i.toString()} error`, e.stack)
      }
    }
  }
  on(messageType: string, handler: any) {
    if (!this.listeners[messageType]) {
      this.listeners[messageType] = []
    }
    this.listeners[messageType].push(handler)
  }
  off(messageType: string, handler: any) {
    this.listeners[messageType] = this.listeners[messageType].filter(_ => _ !== handler)
  }
}
