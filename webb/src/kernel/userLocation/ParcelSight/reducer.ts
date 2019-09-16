import { ParcelSightState } from './types'
import { ParcelSightAction, SET_POSITION, CONFIGURE_LINE_OF_SIGHT_RADIUS } from './actions'
import { parcelsInScope } from './parcelsInScope'

export const INITIAL_PARCEL_SIGHT_STATE: ParcelSightState = {
  currentPosition: { x: 0, y: 0 },
  isTargetPlaced: false,
  lineOfSightRadius: 4,
  currentlySightedList: [],
  currentlySightedMap: {},
  delta: {
    sighted: [],
    lostSight: [],
    currentlyInSight: []
  }
}
export function parcelSightReducer(state?: ParcelSightState, action?: ParcelSightAction): ParcelSightState {
  if (!state) {
    return INITIAL_PARCEL_SIGHT_STATE
  }
  if (!action) {
    return state
  }
  let lineOfSightRadius = state.lineOfSightRadius
  let newPosition = state.currentPosition
  switch (action.type) {
    case CONFIGURE_LINE_OF_SIGHT_RADIUS:
      if (state.lineOfSightRadius === action.payload) {
        return state
      }
      lineOfSightRadius = action.payload
      break
    case SET_POSITION:
      if (
        state.isTargetPlaced &&
        state.currentPosition &&
        state.currentPosition.x === action.payload.x &&
        state.currentPosition.y === action.payload.y &&
        state.delta.sighted.length === 0 &&
        state.delta.lostSight.length === 0
      ) {
        return state
      }
      newPosition = action.payload
      break
    default:
      return state
  }
  const nextSightedList = parcelsInScope(lineOfSightRadius, newPosition)
  const nextSightedMap: Record<string, Boolean> = {}
  nextSightedList.forEach(pos => (nextSightedMap[pos] = true))

  let { currentlySightedList, currentlySightedMap } = state

  const newlySightedParcels = nextSightedList.filter(parcel => !currentlySightedMap[parcel])
  const newlyHiddenParcels = currentlySightedList.filter(parcel => !nextSightedMap[parcel])
  currentlySightedList = nextSightedList
  currentlySightedMap = nextSightedMap

  const delta = {
    sighted: newlySightedParcels,
    lostSight: newlyHiddenParcels,
    currentlyInSight: currentlySightedList
  }
  return {
    currentPosition: newPosition,
    isTargetPlaced: true,
    lineOfSightRadius,
    currentlySightedList,
    currentlySightedMap,
    delta
  }
}
