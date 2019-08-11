import { SubsystemController } from '../subsystems'
import { getBaseWearables } from '../../assets/wearables/base'

export class AssetSystem extends SubsystemController {
  assets: any

  protected async onStart() {
    this.assets = await getBaseWearables()
    return this.onStart()
  }
}
