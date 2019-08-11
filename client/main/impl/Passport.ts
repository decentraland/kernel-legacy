import { SubsystemController } from '../subsystems'
import { ProfileStore } from 'dcl/client/passports/api'

export class PassportSystem extends SubsystemController {
  passports?: ProfileStore

  protected async onStart() {
    this.passports = new ProfileStore()
    this.onSuccess()
  }
}
