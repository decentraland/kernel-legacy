import { ILand } from '@dcl/utils'

export class SceneLifeCycleStatus {
  status: 'unloaded' | 'awake' | 'ready' = 'unloaded'
  constructor(public sceneDescription: ILand<any>) {}
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
