import { API } from '@dcl/rpc/host'

export interface IExposableAPI extends API {
  _getExposedMethods(): Promise<string[]>
}
