import { EventEmitter } from 'events'
import { ParcelLifeCycleController } from './ParcelLifeCycleController'
import { SceneLifeCycleController } from './SceneLifeCycleController'
import { Vector2 } from '@dcl/utils'

export class PositionLifecycleController extends EventEmitter {
  private positionSettled: boolean = false
  private currentSceneId?: string
  private currentlySightedParcels: string[] = []

  constructor(public parcelController: ParcelLifeCycleController, public sceneController: SceneLifeCycleController) {
    super()
    sceneController.on('Scene.started', () => this.checkPositionSettlement())
  }

  async reportCurrentPosition(position: Vector2, teleported: boolean) {
    const parcels = this.parcelController.reportCurrentPosition(position)

    this.currentSceneId = await this.sceneController.resolvePositionToSceneId(`${position.x},${position.y}`)

    if (parcels) {
      await this.sceneController.reportSightedParcels(parcels.sighted, parcels.lostSight)

      if (!this.eqSet(this.currentlySightedParcels, parcels.inSight)) {
        this.currentlySightedParcels = parcels.inSight
      }
    }

    if (teleported) {
      this.positionSettled = false
      this.emit('Unsettled Position')
    }

    this.checkPositionSettlement()
  }

  private eqSet(as: Array<any>, bs: Array<any>) {
    if (as.length !== bs.length) return false
    for (const a of as) if (!bs.includes(a)) return false
    return true
  }

  private checkPositionSettlement() {
    if (!this.positionSettled) {
      const settling = this.currentlySightedParcels.every($ => this.sceneController.isPositionRendereable($))

      if (settling) {
        this.positionSettled = settling
        this.emit('Settled Position', this.currentSceneId)
      }
    }
  }
}
