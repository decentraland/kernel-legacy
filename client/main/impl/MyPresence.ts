const qs = require('querystring')
import { MyPresence } from '../../presence/mine/tracker'
import { SubsystemController } from '../subsystems'
import { SceneLoaderSystem } from './SceneLoader'
import { Scene } from '../../worldMap/scene'
import { upgradeToV2 } from '../../worldMap/compat/v1'

export class MyPresenceSystem extends SubsystemController {
  myPresenceTracker: any

  protected async onStart() {
    const sceneLoader: SceneLoaderSystem = this.deps.filter(dep => dep.name === 'SceneLoader')[0] as SceneLoaderSystem
    const history = window.history
    const location = window.location

    const searchParams = qs.parse(location.search)
    let x = 0,
      y = 0
    if (searchParams['position']) {
      ;[x, y] = searchParams['position'].split(',').map(_ => parseInt(_, 10))
    }
    if (searchParams['x'] && searchParams['y']) {
      x = parseInt(searchParams['x'], 10)
      y = parseInt(searchParams['y'], 10)
    }
    try {
      const scene = await sceneLoader.sceneLoader.getSceneForCoordinates(x, y)
      const upgradedScene = new Scene(upgradeToV2(scene.scene, { data: [{ content: scene.mappingsResponse }] }))
      const initialPosition = upgradedScene.pickSpawnPoint().position
      this.myPresenceTracker = new MyPresence(history, initialPosition)
      this.myPresenceTracker.updateUrlPosition(initialPosition)
      return this.onSuccess()
    } catch (e) {
      return this.onError(e)
    }
  }
}
