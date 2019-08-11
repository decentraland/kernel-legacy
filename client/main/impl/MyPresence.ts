import { MyPresence } from 'dcl/client/presence/mine/tracker';
import { SubsystemController } from '../subsystems';
import { SceneLoaderSystem } from './SceneLoader';

export class MyPresenceSystem extends SubsystemController {
  myPresenceTracker: any

  protected async onStart() {
    const sceneLoader: SceneLoaderSystem = this.deps.filter(dep => dep.name === 'SceneLoader')[0] as SceneLoaderSystem
    const history = window.history

    const initialPosition = await sceneLoader.getCurrentScene().pickSpawnPosition()
    this.myPresenceTracker = new MyPresence(history, initialPosition)
    )
    return this.onStart()
  }
}
