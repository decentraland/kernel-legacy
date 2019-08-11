import { SubsystemController } from '../subsystems'
import { ProfileStore } from 'dcl/client/passports/api'
import { checkSession } from 'dcl/client/auth/lib'
import { getBaseCatalog } from 'dcl/client/assets/wearables/base'

export class PassportSystem extends SubsystemController {
  passports?: ProfileStore

  protected async onStart() {
    const authToken = await checkSession()
    const assetCatalog = await getBaseCatalog()
    this.passports = new ProfileStore(authToken.accessToken, assetCatalog)
    this.onSuccess()
  }
}
