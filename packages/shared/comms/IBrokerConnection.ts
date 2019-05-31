import { Observable } from '../../decentraland-ecs/src/ecs/Observable'

export type BrokerMessage = {
  data: Uint8Array
  channel: string
}

export interface IBrokerConnection {
  onMessageObservable: Observable<BrokerMessage>
  readonly hasUnreliable: boolean
  readonly hasReliable: boolean
  sendReliable(data: Uint8Array): void
  sendUnreliable(data: Uint8Array): void
  logDebug(): void
  close(): void
}
