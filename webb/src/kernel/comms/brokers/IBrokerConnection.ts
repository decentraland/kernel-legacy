import { Observable } from '@dcl/utils'

export type BrokerMessage = {
  data: Uint8Array
  channel: string
}

export interface IBrokerConnection {
  onMessageObservable: Observable<BrokerMessage>
  readonly hasUnreliableChannel: boolean
  readonly hasReliableChannel: boolean
  readonly isAuthenticated: boolean
  readonly isConnected: Promise<void>
  sendReliable(data: Uint8Array): void
  sendUnreliable(data: Uint8Array): void
  printDebugInformation(): void
  close(): void
}
