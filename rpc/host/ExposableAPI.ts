import { API, exposeMethod, getExposedMethods } from '../common/API'

export class ExposableAPI extends API {
  @exposeMethod
  async _getExposedMethods(): Promise<string[]> {
    return Array.from(getExposedMethods(this) as Set<string>)
  }
}
