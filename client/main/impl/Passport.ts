import { SubsystemController } from '../subsystems'
import { ProfileStore } from '../../passports/api'
import { getBaseCatalog } from '../../assets/wearables/base'

export class PassportSystem extends SubsystemController {
  passports?: ProfileStore

  protected async onStart() {
    const assetCatalog = await getBaseCatalog()
    this.passports = new ProfileStore(assetCatalog)
    return this.onSuccess()
  }
}
