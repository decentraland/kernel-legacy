import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { EnvironmentData } from '@dcl/utils'
import { exposeMethod } from '@dcl/rpc/common/API'

@registerAPI('EnvironmentAPI')
export class EnvironmentAPI extends ExposableAPI {
  data!: EnvironmentData<any>
  /**
   * Returns the coordinates and the definition of a parcel
   */
  @exposeMethod
  async getBootstrapData(): Promise<EnvironmentData<any>> {
    return this.data
  }
}
