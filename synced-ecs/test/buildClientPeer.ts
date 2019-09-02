import { MessageBus } from '../scene-api-mocks/MessageBus'
import { emptyNetworkedState } from '../network/emptyNetworkedState'
import { emptyState } from '../ecs/generators/emptyState'
import { ReplicaECS } from '../network/systems/ReplicaECS'
import { IMessageBus } from '../scene-api-interface/IMessageBus'

const us = 'us'

export function buildClientPeer(name?: string, bus?: IMessageBus) {
  if (!bus) {
    bus = new MessageBus()
  }
  const netState = emptyNetworkedState(name || us)
  const ecsState = emptyState()
  const system = new ReplicaECS(ecsState, netState, bus)
  return { bus, netState, system }
}
