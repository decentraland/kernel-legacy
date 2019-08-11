import { SubsystemController } from '../subsystems'
import { connect } from 'dcl/client/comms'
import { Auth } from 'dcl/client'
import { WorldInstanceConnection } from 'dcl/client/comms/worldInstanceConnection'

export class CommsSystem extends SubsystemController {
  worldInstanceConnection?: WorldInstanceConnection

  protected async onStart() {
    this.worldInstanceConnection = await connect((message: string) => {
      return Auth.getMessageCredentials(message)
    })
    return this.onStart()
  }
}
