import { PeerAuthoritySystem } from '../../network/systems/PeerAuthoritySystem'
import { MessageBus } from '../../scene-api-mocks/MessageBus'
import { emptyNetworkedState } from '../../network/emptyNetworkedState'
import { AUTHORITY_QUERY, AUTHORITY_ANNOUNCEMENT, FROM, AUTHORITY } from '../../network/messages'
import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { NetworkedState } from '../../network/NetworkedState'
import { AUTHORITY_QUERY_TIMEOUT } from '../../network/systems/AuthorityAwareSystem'
import { AUTHORITY_BEACON_INTERVAL, AuthorityBeaconSystem } from '../../network/systems/AuthorityBeaconSystem'
import { BEACON_INTERVAL } from '../../network/systems/PresenceBeaconSystem'

const us = 'Us'
const somebody = 'Someone'

function beforeAll(): [IMessageBus, NetworkedState, PeerAuthoritySystem] {
  const bus = new MessageBus()
  const state = emptyNetworkedState(us)
  const system = new PeerAuthoritySystem(state, bus)
  return [bus, state, system]
}

describe('PeerAuthoritySystem', () => {
  it('initial state', () => {
    const [bus, state, system] = beforeAll()
    expect(bus).toBeTruthy()
    expect(state).toBeTruthy()
    expect(system.areWeAuthoritative()).toBe(false)
  })

  it('state after activation', () => {
    const [bus, status, system] = beforeAll()
    var calledAuthorityCheck = { called: false, args: null }
    bus.on(AUTHORITY_QUERY, (args: any) => {
      calledAuthorityCheck.called = true
      calledAuthorityCheck.args = args
    })
    system.activate()
    expect(system.time).toBe(0)
    expect(system.areWeAuthoritative()).toBe(false)
    expect(status).toBeTruthy()
    expect(calledAuthorityCheck.called).toBe(true)
  })

  it('received authority info', () => {
    const [bus, state, system] = beforeAll()
    bus.on(AUTHORITY_QUERY, (_: any) => {
      bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: somebody, [AUTHORITY]: somebody })
    })
    system.activate()
    expect(system.areWeAuthoritative()).toBe(false)
    expect(state.authority).toBe(somebody)
  })

  it('timeout receiving authority info', () => {
    const setup = beforeAll()
    const state = setup[1]
    const system = setup[2]
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    expect(system.areWeAuthoritative()).toBe(true)
    expect(state.authority).toBe(state.syncId)
  })

  it('we send an authority beacon on becoming authority', () => {
    const [bus, state, system] = beforeAll()
    const calledAuthorityCheck: any = {}
    bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
      calledAuthorityCheck.args = args
    })
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    expect(calledAuthorityCheck.args).toEqual({ [FROM]: state.syncId, [AUTHORITY]: state.syncId })
  })

  it('we reply to authority queries', () => {
    const [bus, state, system] = beforeAll()
    const us = state.syncId
    const ourBeacon = { [FROM]: us, [AUTHORITY]: us }
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    bus.on(AUTHORITY_QUERY, (messageType: string, args: any) => {
      bus.emit(AUTHORITY_ANNOUNCEMENT, ourBeacon)
    })
    const peerSystem = new PeerAuthoritySystem(emptyNetworkedState(1), bus)
    peerSystem.activate()
    expect(peerSystem.state.syncId).not.toBe(state.syncId)
    expect(peerSystem.state.authority).toBe(us)
  })

  it('we send a beacon every now and then', () => {
    const [bus, state, system] = beforeAll()
    const us = state.syncId
    const ourBeacon = { [FROM]: us, [AUTHORITY]: us }
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    const callCount = { counter: 0 }
    bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
      callCount.counter++
      expect(args).toEqual(ourBeacon)
    })
    expect(callCount.counter).toBe(0)
    system.update(AUTHORITY_BEACON_INTERVAL - 1)
    expect(callCount.counter).toBe(0)
    system.update(1)
    expect(callCount.counter).toBe(1)
    system.update(AUTHORITY_BEACON_INTERVAL)
    expect(callCount.counter).toBe(2)
    system.update(AUTHORITY_BEACON_INTERVAL)
    expect(callCount.counter).toBe(3)
  })

  class BullyAuthoritySystem extends AuthorityBeaconSystem {
    activate() {
      super.activate()
      this.sendAuthorityBeacon()
    }
    areWeAuthoritative() {
      return true
    }
  }

  it('new authority arrives', () => {
    const [bus, state, system] = beforeAll()
    const us = state.syncId
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    expect(state.authority).toBe(us)
    const peerSystem = new BullyAuthoritySystem(emptyNetworkedState(somebody), bus)
    peerSystem.activate()
    expect(state.authority).toBe(somebody)
  })

  it('emptyNetworkedState allows strings', () => {
    const newState = emptyNetworkedState(somebody)
    expect(newState).toEqual({ syncId: somebody, registeredPeers: {}, authority: undefined })
  })

  it('stop sending beacons if another authority is present', () => {
    const [bus, state, system] = beforeAll()
    system.activate()
    system.update(AUTHORITY_QUERY_TIMEOUT + 1)
    const peerSystem = new BullyAuthoritySystem(emptyNetworkedState(somebody), bus)
    peerSystem.activate()
    expect(state.authority).toBe(somebody)
    const callCount = { counter: 0 }
    bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
      expect(args).toEqual({ [FROM]: somebody, [AUTHORITY]: somebody })
      callCount.counter++
    })
    peerSystem.update(BEACON_INTERVAL)
    system.update(BEACON_INTERVAL)
    peerSystem.update(BEACON_INTERVAL)
    system.update(BEACON_INTERVAL)
    expect(callCount.counter).toBe(2)
  })
})
