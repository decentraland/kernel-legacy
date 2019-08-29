import { SubsystemController } from '../subsystems'
import { getBaseCatalog } from '../../assets/wearables/base'

export class AssetSystem extends SubsystemController {
  assets: any

  protected async onStart() {
    this.assets = await getBaseCatalog()
    return this.onSuccess()
  }
}
