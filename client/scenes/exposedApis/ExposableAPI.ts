import { API, exposeMethod, getExposedMethods } from 'dcl/rpc/host'

export class ExposableAPI extends API {
  @exposeMethod
  async _getExposedMethods(): Promise<string[]> {
    return Array.from(getExposedMethods(this) as Set<string>)
  }
}
