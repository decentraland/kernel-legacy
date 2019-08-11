import { SubsystemController } from '../subsystems'
import { getBaseWearables } from 'dcl/client/assets/wearables/base'

export class AssetSystem extends SubsystemController {
  assets: any

  protected async onStart() {
    this.assets = await getBaseWearables()
    this.onStart()
  }
}
