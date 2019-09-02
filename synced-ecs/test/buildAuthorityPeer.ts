import { MessageBus } from '../scene-api-mocks/MessageBus'
import { emptyNetworkedState } from '../network/emptyNetworkedState'
import { emptyState } from '../ecs/generators/emptyState'
import { IMessageBus } from '../scene-api-interface/IMessageBus'
import { PrimaryECS } from '../network/systems/PrimaryECS'

export function buildAuthorityPeer(name: string, bus: IMessageBus) {
  if (!bus) {
    bus = new MessageBus()
  }
  const authNet = emptyNetworkedState(name)
  const initialEcsState = emptyState()
  const authSystem = new PrimaryECS(initialEcsState, authNet, bus)
  return { bus, authNet, authSystem, initialEcsState }
}
