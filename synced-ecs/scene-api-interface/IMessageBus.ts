export interface IMessageBus {
  emit(
    messageType: string,
    payload: {
      [key: string]: any
    }
  ): void
  /**
   * Could be:
   * (messageType: T, payload: { [key: string]: any }) => void)
   */
  on(messageType: string, handler: any): void
  off(messageType: string, handler: any): void
}
