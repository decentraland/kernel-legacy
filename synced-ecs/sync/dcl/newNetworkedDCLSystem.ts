import { PeerAuthoritySystem } from '../../network/systems/PeerAuthoritySystem'
import { DecentralandInterface } from '../../scene-api-interface/DCL'
import { MessageBus } from '../../scene-api-mocks/MessageBus'
import { emptyNetworkedState } from '../../network/emptyNetworkedState'
import { NetworkedDCLSystem } from './NetworkedECS'

export function newNetworkedDCLSystem(dcl: DecentralandInterface) {
  const bus = new MessageBus()
  const state = emptyNetworkedState()
  const authority = new PeerAuthoritySystem(state, bus)
  return new NetworkedDCLSystem(dcl, bus, state, authority)
}
