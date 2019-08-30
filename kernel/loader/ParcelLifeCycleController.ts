import { EventEmitter } from 'events'
import { Vector2 } from '@dcl/utils'
import { parcelsInScope } from './scope/parcelsInScope'

export type DeltaParcelSightSeeingReport = {
  sighted: string[]
  lostSight: string[]
  inSight: string[]
}

type MapPositionToBoolean = { [pos: string]: boolean }

export class ParcelLifeCycleController extends EventEmitter /*<'Parcel.onSight' | 'Parcel.lostSight'>*/ {
  currentPosition?: Vector2
  isTargetPlaced: boolean = false
  currentlySightedList = []
  currentlySightedMap = {}

  constructor(public config: { lineOfSightRadius: number }) {
    super()
  }

  reportCurrentPosition(position: Vector2) {
    if (this.currentPosition && this.currentPosition.x === position.x && this.currentPosition.y === position.y) {
      return
    }
    this.currentPosition = position

    this.isTargetPlaced = true
    const sightedParcels = parcelsInScope(this.config.lineOfSightRadius, position)

    const newlySightedParcels = sightedParcels.filter(parcel => !this.currentlySightedMap[parcel])
    const newSightMap: MapPositionToBoolean = {}
    sightedParcels.forEach(pos => (newSightMap[pos] = true))
    const newlyHiddenParcels = this.currentlySightedList.filter(parcel => !newSightMap[parcel])

    this.emit('Parcel.sightChanges', newlySightedParcels, newlyHiddenParcels)
  }

  inSight(parcel: string) {
    return !!this.currentlySightedMap[parcel]
  }
}
