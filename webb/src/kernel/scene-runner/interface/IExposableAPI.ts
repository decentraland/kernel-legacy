import { API } from '@dcl/rpc/common/API'

/**
 * APIs that the kernel exposes to the scenes
 */
export interface IExposableAPI extends API {
  _getExposedMethods(): Promise<string[]>
}
