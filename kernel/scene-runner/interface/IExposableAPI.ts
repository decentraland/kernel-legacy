import { API } from '@dcl/rpc/common/API'

export interface IExposableAPI extends API {
  _getExposedMethods(): Promise<string[]>
}
