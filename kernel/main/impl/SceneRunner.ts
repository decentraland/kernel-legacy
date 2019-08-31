import { SubsystemController } from '../subsystems'
import { SceneLoader } from '../../loader/SceneLoader'
import { SceneLoaderSystem } from './SceneLoader'
import { SceneWorkersManager } from '../../scene-runner/SceneWorkersManager'

export class SceneRunnerSystem extends SubsystemController {
  loader: SceneLoader
  workerManager: SceneWorkersManager

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