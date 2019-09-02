import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { ECS } from '../../ecs/EntityComponentState'
import {
  REQUEST_SNAPSHOT,
  FROM,
  DELTA,
  DATA,
  DeltaMessage,
  UNTIL,
  SINCE,
  Snapshot,
  LOOKUP_ID,
  SNAPSHOT
} from '../messages'
import { NetworkedState } from '../NetworkedState'
import { TimeSystem } from './TimeSystem'
import { Update } from '../../ecs/update/Update'
import { applyUpdate } from '../../ecs/update/applyUpdate'

export const SNAPSHOT_TIMEOUT = 5000

export class ReplicaECS extends TimeSystem {
  snapshotRequestTimestamp: number = 0
  lastUpdate: number = 0
  primaryTime: number = -1
  stored: { [key: number]: DeltaMessage } = {}

  constructor(public state: ECS, public netState: NetworkedState, public bus: IMessageBus) {
    super()
  }

  activate() {
    super.activate()
    this.listenForSnapshots()
    this.listenForUpdates()
    this.querySnapshot()
  }

  update(dt: number) {
    super.update(dt)
    if (this.snapshotRequestTimedOut()) {
      this.querySnapshot()
    }
  }

  querySnapshot() {
    this.snapshotRequestTimestamp = this.now()
    this.bus.emit(REQUEST_SNAPSHOT, { [FROM]: this.netState.syncId, [LOOKUP_ID]: this.now() })
  }

  listenForSnapshots() {
    this.bus.on(SNAPSHOT, (_: any, snapshot: Snapshot) => this.receiveSnapshot(snapshot))
  }

  receiveSnapshot(snapshot: Snapshot) {
    this.state = snapshot[DATA]
    let time = snapshot[UNTIL]

    while (this.stored[time] !== undefined) {
      const delta = this.stored[time]
      delete this.stored[time]
      this.applyUpdates(delta[DATA])
      time = delta[UNTIL]
    }
    this.stored = {}
    this.primaryTime = time
  }

  snapshotRequestTimedOut() {
    return this.snapshotRequestTimestamp === 0 || this.now() - this.snapshotRequestTimestamp > SNAPSHOT_TIMEOUT
  }

  hasPrimaryTime() {
    return this.primaryTime !== -1
  }

  applyUpdates(updates: Update[]) {
    this.state = updates.reduce(applyUpdate, this.state)
  }

  listenForUpdates() {
    this.bus.on(DELTA, (_: any, message: DeltaMessage) => {
      if (this.hasPrimaryTime()) {
        if (this.primaryTime !== message[SINCE]) {
          console.log('warning -- lost sync')
        } else {
          this.applyUpdates(message[DATA])
          this.primaryTime = message[UNTIL]
        }
      } else {
        this.storeDelta(message)
      }
    })
  }

  storeDelta(message: DeltaMessage) {
    this.stored[message[SINCE]] = message
  }
}
