const qs = require('querystring')
import { MyPresence } from '../../presence/mine/myPresence'
import { SubsystemController } from '../subsystems'
import { SceneLoaderSystem } from './SceneLoader'

export class MyPresenceSystem extends SubsystemController {
  myPresenceTracker: MyPresence

  protected async onStart() {
    const sceneLoader: SceneLoaderSystem = this.deps.filter(dep => dep.name === 'SceneLoader')[0] as SceneLoaderSystem
    const location = window.location
    const history = window.history

    const searchParams = qs.parse(location.search)
    let x = 0,
      y = 0
    if (searchParams['position']) {
      ;[x, y] = searchParams['position'].split(',').map(_ => parseInt(_, 10))
    } else if (searchParams['x'] && searchParams['y']) {
      x = parseInt(searchParams['x'], 10)
      y = parseInt(searchParams['y'], 10)
    }
    try {
      this.myPresenceTracker = new MyPresence(sceneLoader.sceneLoader, history, location)
      await this.myPresenceTracker.teleport(x, y)
      return this.onSuccess()
    } catch (e) {
      return this.onError(e)
    }
  }
}
