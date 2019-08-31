import { ISceneManifest } from '@dcl/utils'
import { GlobalScriptedScenesManager } from './GlobalScriptedScenesManager'
export class MemorySceneWorkersManager extends GlobalScriptedScenesManager {
  onSceneAwake(scene: ISceneManifest) {
    throw new Error('Method not implemented.')
  }
  onSceneWillStart(scene: ISceneManifest) {
    throw new Error('Method not implemented.')
  }
  onSceneRunning(scene: ISceneManifest) {
    throw new Error('Method not implemented.')
  }
  onSceneWillUnload(scene: ISceneManifest) {
    throw new Error('Method not implemented.')
  }
  onSceneDidUnload(scene: ISceneManifest) {
    throw new Error('Method not implemented.')
  }
}
