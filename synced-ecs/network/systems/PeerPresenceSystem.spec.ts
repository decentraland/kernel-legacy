import { MessageBus } from '../../scene-api-mocks/MessageBus'
import { emptyNetworkedState } from '../../network/emptyNetworkedState'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { NetworkedState } from '../../network/NetworkedState'
import { PeerPresenceSystem, PEER_TIMED_OUT } from '../../network/systems/PeerPresenceSystem'
import { PresenceBeaconSystem } from '../../network/systems/PresenceBeaconSystem'
import { QUERY_PRESENCE, FROM, TO, PRESENCE } from '../../network/messages'

const us = 'Wei'
const [peer1, peer2] = ['Satoshi', 'Hal']

function systemBuilder(clazz: any) {
  return function setupSystem(peer: string, bus?: IMessageBus): [NetworkedState, PeerPresenceSystem, IMessageBus] {
    if (bus === undefined) {
      bus = new MessageBus()
    }
    const state = emptyNetworkedState(peer)
    const system = new clazz(state, bus)

    return [state, system, bus]
  }
}
const setupPeerSystem = systemBuilder(PeerPresenceSystem)
const setupBeacon = systemBuilder(PresenceBeaconSystem)

describe('PeerPresenceSystem', () => {
  it('initial state', () => {
    const [state, system, bus] = setupPeerSystem(us)
    const [state1, system1] = setupBeacon(peer1, bus)
    const [state2, system2] = setupBeacon(peer2, bus)

    system.activate()
    expect(Object.keys(state.registeredPeers).length).toBe(0)
    system1.activate()
    expect(Object.keys(state.registeredPeers).length).toBe(1)
    system2.activate()
    expect(Object.keys(state.registeredPeers).length).toBe(2)
    expect(state1).not.toEqual(state2)
  })

  function beforeAll() {
    const [myState, mySystem, bus] = setupPeerSystem(us)
    const [state1, beacon1] = setupBeacon(peer1, bus)
    const [state2, beacon2] = setupBeacon(peer2, bus)
    const system1 = new PeerPresenceSystem(state1, bus)
    const system2 = new PeerPresenceSystem(state2, bus)
    mySystem.activate()
    system1.activate()
    system2.activate()
    beacon1.activate()
    beacon2.activate()
    return { myState, mySystem, bus, state1, system1, state2, system2, beacon1, beacon2 }
  }

  it('times out peers', () => {
    const { myState, mySystem } = beforeAll()
    expect(Object.keys(myState.registeredPeers).length).toBe(2)
    mySystem.update(PEER_TIMED_OUT / 2)
    expect(Object.keys(myState.registeredPeers).length).toBe(2)
    mySystem.update(PEER_TIMED_OUT / 2)
    expect(Object.keys(myState.registeredPeers).length).toBe(0)
  })

  it('peer replies to query', () => {
    const { bus } = beforeAll()
    const calls: any = {}
    bus.on(PRESENCE, (_: any, message: any) => {
      calls.data = message
    })
    bus.emit(QUERY_PRESENCE, { [FROM]: peer1, [TO]: us })
    expect(calls.data).toEqual({ [FROM]: us, [TO]: peer1 })
  })
})
