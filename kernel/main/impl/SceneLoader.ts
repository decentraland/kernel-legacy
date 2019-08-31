import { parcelLimits } from '@dcl/utils'
import { getServerConfigurations } from '@dcl/config'

import { SubsystemController } from '../subsystems'
import { SceneLoader } from '../../loader/SceneLoader'

export class SceneLoaderSystem extends SubsystemController {
  sceneLoader: SceneLoader

  protected async onStart() {
    this.sceneLoader = new SceneLoader()
    this.sceneLoader.setup(getServerConfigurations().content, parcelLimits.visibleRadius)
    return this.onSuccess()
  }
}