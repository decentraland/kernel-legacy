import { SubsystemController } from '../subsystems'
import { ProfileStore } from 'dcl/client/passports/api'
import { getBaseCatalog } from 'dcl/client/assets/wearables/base'

export class PassportSystem extends SubsystemController {
  passports?: ProfileStore

  protected async onStart() {
    const assetCatalog = await getBaseCatalog()
    this.passports = new ProfileStore(assetCatalog)
    return this.onSuccess()
  }
}
