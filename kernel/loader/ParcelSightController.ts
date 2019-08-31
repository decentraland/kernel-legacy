import { EventEmitter } from 'events'
import { Vector2 } from '@dcl/utils'
import { parcelsInScope } from './scope/parcelsInScope'

export type DeltaParcelSightSeeingReport = {
  sighted: string[]
  lostSight: string[]
  inSight: string[]
}

type MapPositionToBoolean = { [pos: string]: boolean }

export class ParcelSightController extends EventEmitter /*<'Parcel.sightChanges'>*/ {
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
    const newSightMap: MapPositionToBoolean = {}
    sightedParcels.forEach(pos => (newSightMap[pos] = true))

    const newlySightedParcels = sightedParcels.filter(parcel => !this.currentlySightedMap[parcel])
    const newlyHiddenParcels = this.currentlySightedList.filter(parcel => !newSightMap[parcel])
    this.currentlySightedList = sightedParcels
    this.currentlySightedMap = newSightMap

    this.emit('Parcel.sightChanges', {
      sighted: newlySightedParcels,
      lostSight: newlyHiddenParcels,
      inSight: this.currentlySightedList
    })
  }

  inSight(parcel: string) {
    return !!this.currentlySightedMap[parcel]
  }
}
