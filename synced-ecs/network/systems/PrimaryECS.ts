import { IMessageBus } from '../../scene-api-interface/IMessageBus'
import { ECS } from '../../ecs/EntityComponentState'
import { REQUEST_SNAPSHOT, SNAPSHOT, LOOKUP_ID, TO, FROM, DELTA, SINCE, UNTIL, DATA } from '../messages'
import { NetworkedState } from '../NetworkedState'
import { TimeSystem } from './TimeSystem'
import { Update } from '../../ecs/update/Update'
import { applyUpdate } from '../../ecs/update/applyUpdate'
import { ECSFunctionName } from '../../ecs/update/ECSFunctionName'

export class PrimaryECS extends TimeSystem {
  queuedUpdates: Update[] = []
  lastUpdate: number = 0

  constructor(public state: ECS, public netState: NetworkedState, public bus: IMessageBus) {
    super()
  }

  replySnapshots = (_: any, message: any) => {
    this.bus.emit(SNAPSHOT, {
      [FROM]: this.netState.syncId,
      [TO]: message[FROM],
      [LOOKUP_ID]: message[LOOKUP_ID],
      [DATA]: this.state
    })
  }

  activate() {
    super.activate()
    this.setupReplySnapshotRequests()
  }

  update(dt: number) {
    super.update(dt)
    if (this.queuedUpdates.length) {
      this.applyAndSendUpdates()
    }
  }

  addUpdate(fun: ECSFunctionName, args: any[]) {
    this.queuedUpdates.push({
      type: fun,
      payload: args
    })
  }

  applyAndSendUpdates() {
    const { lastUpdate, queuedUpdates } = this
    this.applyAllQueuedUpdates()
    this.bus.emit(DELTA, {
      [FROM]: this.netState.syncId,
      [SINCE]: lastUpdate,
      [UNTIL]: this.now(),
      [DATA]: queuedUpdates
    })
  }

  applyAllQueuedUpdates() {
    this.state = this.queuedUpdates.reduce(applyUpdate, this.state)
    this.lastUpdate = this.now()
    this.queuedUpdates = []
  }

  setupReplySnapshotRequests() {
    this.bus.on(REQUEST_SNAPSHOT, this.replySnapshots)
  }

  disableReplySnapshotRequests() {
    this.bus.off(REQUEST_SNAPSHOT, this.replySnapshots)
  }
}
