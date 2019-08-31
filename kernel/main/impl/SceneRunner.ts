import { SubsystemController } from '../subsystems'
import { SceneLoader } from '../../loader/SceneLoader'
import { SceneLoaderSystem } from './SceneLoader'
import { SceneWorkersManager } from '../../scene-runner/SceneWorkersManager'
import { ISceneManifest } from '@dcl/utils'

class MemorySceneWorkersManager extends SceneWorkersManager {
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

export class SceneRunnerSystem extends SubsystemController {
  loader: SceneLoader
  workerManager: MemorySceneWorkersManager

  protected async onStart() {
    this.loader = (this.deps.filter(dep => dep.name === 'SceneLoader')[0] as SceneLoaderSystem).sceneLoader

    this.loader.on('Scene.loading', (...args) => {
      console.log('run me', args)
    })
    this.loader.on('Scene.awake', () => {})
    this.loader.on('Scene.running', () => {})
    this.loader.on('Scene.stop', () => {})

    return this.onSuccess()
  }
}
