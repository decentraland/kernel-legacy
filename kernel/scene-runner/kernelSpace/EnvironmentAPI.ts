import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { ISceneManifest } from '@dcl/utils'
import { exposeMethod } from '@dcl/rpc/common/API'

@registerAPI('EnvironmentAPI')
export class EnvironmentAPI extends ExposableAPI {
  sceneManifest!: ISceneManifest
  /**
   * Returns the coordinates and the definition of a parcel
   */
  @exposeMethod
  async getBootstrapData(): Promise<ISceneManifest> {
    return this.sceneManifest
  }
}
