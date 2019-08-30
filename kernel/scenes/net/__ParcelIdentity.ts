import { registerAPI, ExposableAPI } from '@dcl/rpc/host'
import { ILand } from '@dcl/utils'
import { exposeMethod } from '@dcl/rpc/common/API'
import { downgradeToILand } from '../../worldMap/sceneCompatibility/downgradeToILand'
import { ISceneManifest } from '@dcl/utils/scene'

/**
 * This is a legacy interface to get information about the
 */
export interface IParcelIdentity {
  getParcel(): Promise<{ x: number; y: number; land: ILand<any>; cid: string }>
}

@registerAPI('ParcelIdentity')
export class ParcelIdentity extends ExposableAPI implements IParcelIdentity {
  x!: number
  y!: number
  scene: ISceneManifest
  cid!: string

  /**
   * Returns the coordinates and the definition of a parcel
   */
  @exposeMethod
  async getParcel(): Promise<{ x: number; y: number; land: ILand<any>; cid: string }> {
    return {
      x: this.x,
      y: this.y,
      land: downgradeToILand(this.scene),
      cid: this.cid
    }
  }
}
