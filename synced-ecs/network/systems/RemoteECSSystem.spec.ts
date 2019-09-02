import { DATA, SNAPSHOT, TO, UNTIL } from '../messages'
import { buildAuthorityPeer } from '../../test/buildAuthorityPeer'
import { buildClientPeer } from '../../test/buildClientPeer'

export const us = 'Us'

describe('RemoteECS', () => {
  it('replica system initial setup', () => {
    const { system, bus } = buildClientPeer(us)
    const { authSystem } = buildAuthorityPeer('auth', bus)
    authSystem.activate()
    system.activate()
    expect(system.state).toEqual(authSystem.state)
  })

  it('apply patches that came after snapshot', () => {
    const { system, bus } = buildClientPeer(us)
    const { initialEcsState, authSystem } = buildAuthorityPeer('auth', bus)

    authSystem.activate()
    authSystem.disableReplySnapshotRequests()
    system.activate()
    authSystem.addUpdate('addEntity', ['First Entity'])
    authSystem.update(1)
    authSystem.addUpdate('addEntity', ['Second Entity'])
    authSystem.update(1)

    bus.emit(SNAPSHOT, { [TO]: us, [UNTIL]: 0, [DATA]: initialEcsState })
    expect(system.state).toEqual(authSystem.state)
  })
})
