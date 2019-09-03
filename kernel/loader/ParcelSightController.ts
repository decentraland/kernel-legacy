import { EventEmitter } from 'events'
import { Vector2, encodeParcelPosition } from '@dcl/utils'
import { ParcelSightState, configureLineOfSightRadius, setPosition } from './ParcelSight/ParcelSight.types'
import { ParcelSightReducer } from './ParcelSight/ParcelSight.reducer'
import { inSight } from './ParcelSight/ParcelSight.selectors'

export class ParcelSightController extends EventEmitter {
  state: ParcelSightState
  constructor(config?: { lineOfSightRadius: number }) {
    super()
    this.state = ParcelSightReducer(undefined)
    if (config) {
      this.state = ParcelSightReducer(this.state, configureLineOfSightRadius(config.lineOfSightRadius))
    }
  }
  reportCurrentPosition(position: Vector2) {
    const newState = ParcelSightReducer(this.state, setPosition(position))
    if (newState.delta.sighted.length || newState.delta.lostSight.length) {
      this.emit('Parcel.sightChanges', newState.delta)
    }
    return newState.delta
  }
  get currentlySightedList() {
    return this.state.currentlySightedList
  }
  inSight(position: Vector2 | string) {
    if (typeof position === 'string') {
      return inSight(this.state, position)
    }
    return inSight(this.state, encodeParcelPosition(position))
  }
}
