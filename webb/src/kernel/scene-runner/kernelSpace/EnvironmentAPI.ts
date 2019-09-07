import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { ISceneManifest } from '@dcl/utils'
import { exposeMethod } from '@dcl/rpc/common/API'

export type GamekitRequiredBootstrapInfo = {
  main: string
  mappings: { file: string; hash: string }[]
}

@registerAPI('EnvironmentAPI')
export class EnvironmentAPI extends ExposableAPI {
  sceneManifest: ISceneManifest
  constructor(options: any) {
    super(options)
  }
  /**
   * Returns the coordinates and the definition of a parcel
   */
  @exposeMethod
  async getBootstrapData(): Promise<GamekitRequiredBootstrapInfo> {
    return Promise.resolve({
      ...JSON.parse((this.sceneManifest as any)['_cannonicalRepresentation']),
      mappings: this.sceneManifest.legacyMappings,
      baseUrl: 'https://content.decentraland.org/contents/'
    })
  }
}
