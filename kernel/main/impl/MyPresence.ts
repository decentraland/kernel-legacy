import { SubscriptionUpdater } from '../../presence/mine/comms/SubscriptionUpdater'
import { BroadcastPresence } from '../../presence/mine/comms/BroadcastPresence'
import { getPositionFromUrl } from '../../presence/mine/getPositionFromUrl'
import { MyPresence } from '../../presence/mine/myPresence'
import { SubsystemController } from '../subsystems'
import { SceneLoaderSystem } from './SceneLoader'
import { CommsSystem } from './Comms'

export const LOW_PRIORITY_INTERVAL = 2000

export class MyPresenceSystem extends SubsystemController {
  myPresenceTracker: MyPresence

  broadcastPresence: BroadcastPresence
  updateSubscriptions: SubscriptionUpdater

  protected async onStart() {
    const sceneLoader: SceneLoaderSystem = this.deps.filter(dep => dep.name === 'SceneLoader')[0] as SceneLoaderSystem
    const comms: CommsSystem = this.deps.filter(dep => dep.name === 'Comms')[0] as CommsSystem

    const { x, y } = getPositionFromUrl()
    try {
      this.myPresenceTracker = new MyPresence(sceneLoader.sceneLoader, history, location)

      this.broadcastPresence = new BroadcastPresence(this.myPresenceTracker)
      this.updateSubscriptions = new SubscriptionUpdater(this.myPresenceTracker)

      this.broadcastPresence.activate(comms.connection!)
      this.updateSubscriptions.activate(comms.connection!)

      this.setupBroadcastTimer(LOW_PRIORITY_INTERVAL)

      await this.myPresenceTracker.teleport(x, y)
      return this.onSuccess()
    } catch (e) {
      return this.onError(e)
    }
  }

  broadcastInterval: any
  setupBroadcastTimer(interval: number) {
    var last = getNow()
    this.broadcastInterval = setInterval(() => {
      const now = getNow()
      const delta = now - last
      last = now
      this.broadcastPresence.update(delta)
    }, interval)
  }
}

function getNow() {
  return new Date().getTime()
}
