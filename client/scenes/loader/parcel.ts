import { EventEmitter } from 'events'
import { Vector2 } from 'dcl/utils'

import { ParcelConfigurationOptions, parcelsInScope } from './scope'
import { ParcelLifeCycleStatus } from './types'

export class ParcelLifeCycleController extends EventEmitter {
  config: ParcelConfigurationOptions
  currentPosition?: Vector2

  isTargetPlaced: boolean = false

  missingDataParcelsCount = 0

  parcelStatus = new Map<string, ParcelLifeCycleStatus>()

  currentlySightedParcels = new Set<string>()

  constructor(config: ParcelConfigurationOptions) {
    super()
    this.config = config
  }

  reportCurrentPosition(position: Vector2) {
    if (this.currentPosition && this.currentPosition.x === position.x && this.currentPosition.y === position.y) {
      return
    }
    this.currentPosition = position

    this.isTargetPlaced = true
    const sightedParcels = parcelsInScope(this.config, position)
    const sightedParcelsSet = new Set<string>()
    for (const parcel of sightedParcels) {
      sightedParcelsSet.add(parcel)
      this.parcelSighted(parcel)
    }
    for (const parcel of this.currentlySightedParcels) {
      if (!sightedParcelsSet.has(parcel)) {
        this.switchParcelToOutOfSight(parcel)
      }
    }
    this.currentlySightedParcels = sightedParcelsSet
  }

  inSight(parcel: string) {
    return !!this.currentlySightedParcels.has(parcel)
  }

  parcelSighted(parcel: string) {
    let status = this.parcelStatus.get(parcel)
    if (!status) {
      status = new ParcelLifeCycleStatus(parcel)
      this.parcelStatus.set(parcel, status)
    }
    if (status.isOutOfSight()) {
      this.currentlySightedParcels.add(parcel)
      status.setInSight()
      this.emit('Parcel.onSight', parcel)
    }
  }

  switchParcelToOutOfSight(parcel: string) {
    if (!this.parcelStatus.has(parcel)) {
      return
    }
    const status = this.parcelStatus.get(parcel)
    if (status && status.isInSight()) {
      status.setOffSight()
      this.emit('Parcel.lostSight', parcel)
    }
  }
}
