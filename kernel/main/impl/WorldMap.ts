import { SubsystemController } from '../subsystems'

export class WorldMapSystem extends SubsystemController {
  protected async onStart() {
    return this.onSuccess()
  }
}
