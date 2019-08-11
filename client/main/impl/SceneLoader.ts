import { parcelLimits } from '@dcl/utils'
import { getServerConfigurations } from '@dcl/config'

import { SubsystemController } from '../subsystems'
import { SceneLoader } from '../../scenes/loader'

export class SceneLoaderSystem extends SubsystemController {
  sceneLoader: SceneLoader

  protected async onStart() {
    this.sceneLoader = new SceneLoader(getServerConfigurations().content, parcelLimits.visibleRadius)
    return this.onStart()
  }
}
