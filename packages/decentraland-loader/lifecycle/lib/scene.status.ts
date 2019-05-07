import { ILand } from 'shared/types'

export class SceneLifeCycleStatus {
  constructor(description: ILand) {
    this.sceneDescription = description
    this.status = 'unloaded'
  }
  sceneDescription: ILand
  status:
    | 'unloaded' // scene is not loaded
    | 'awake' // scene is loading assets
    | 'ready' // scene is running

  isAwake() {
    return this.status !== 'unloaded'
  }
  isDead() {
    return this.status === 'unloaded'
  }
  isRunning() {
    return this.status === 'ready'
  }
}
