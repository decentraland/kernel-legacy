import { SubsystemController } from '../subsystems'

export class ConfigSystem extends SubsystemController {
  protected async onStart() {
    return this.onSuccess()
  }
}
