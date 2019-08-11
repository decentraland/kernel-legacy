import { SubsystemController } from '../subsystems'
import { connect } from '../../comms'
import { WorldInstanceConnection } from '../../comms/worldInstanceConnection'
import { Auth } from '../../'

export class CommsSystem extends SubsystemController {
  worldInstanceConnection?: WorldInstanceConnection

  protected async onStart() {
    this.worldInstanceConnection = await connect((message: string) => {
      return Auth.getMessageCredentials(message)
    })
    return this.onStart()
  }
}
