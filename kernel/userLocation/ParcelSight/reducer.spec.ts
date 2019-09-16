import { INITIAL_PARCEL_SIGHT_STATE, parcelSightReducer } from './reducer'
import { setPosition, configureLineOfSightRadius } from './actions'

describe('parcel sight behavior', () => {
  it('changing the line of sight triggers new seen parcels', () => {
    let state = INITIAL_PARCEL_SIGHT_STATE
    state = parcelSightReducer(state, setPosition({ x: 0, y: 0 }))
    expect(state.currentlySightedList.length).toBe(49)
    state = parcelSightReducer(state, configureLineOfSightRadius(0))
    expect(state.delta.sighted.length).toBe(0)
    expect(state.delta.currentlyInSight.length).toBe(1)
    expect(state.delta.lostSight.length).toBe(48)
    state = parcelSightReducer(state, configureLineOfSightRadius(1))
  })
  it('moving position by 1, triggers (2n+1) changes', () => {
    let state = INITIAL_PARCEL_SIGHT_STATE
    state = parcelSightReducer(state, setPosition({ x: 0, y: 0 }))
    state = parcelSightReducer(state, setPosition({ x: 0, y: 1 }))
    expect(state.delta.sighted.length).toBe(state.lineOfSightRadius * 2 + 1)
    expect(state.delta.lostSight.length).toBe(state.lineOfSightRadius * 2 + 1)
  })
  it('moving to the same position does not trigger changes', () => {
    let state = INITIAL_PARCEL_SIGHT_STATE
    state = parcelSightReducer(state, setPosition({ x: 0, y: 0 }))
    state = parcelSightReducer(state, setPosition({ x: 0, y: 0 }))
    expect(state.delta.sighted.length).toBe(0)
    expect(state.delta.lostSight.length).toBe(0)
  })
  it('starting position is empty', () => {
    const state = INITIAL_PARCEL_SIGHT_STATE
    expect(state.currentlySightedList).toEqual([])
  })
  it('setting position to 0,0 check a bunch of coordinates', () => {
    const state = INITIAL_PARCEL_SIGHT_STATE
    const newState = parcelSightReducer(state, setPosition({ x: 0, y: 0 }))
    expect(newState.currentPosition).toEqual({ x: 0, y: 0 })
    expect(newState.currentlySightedList).toEqual([
      '0,0',
      '-1,0',
      '0,-1',
      '0,1',
      '1,0',
      '-1,1',
      '-1,-1',
      '1,-1',
      '1,1',
      '0,-2',
      '2,0',
      '0,2',
      '-2,0',
      '1,-2',
      '-2,1',
      '-1,-2',
      '-1,2',
      '1,2',
      '2,-1',
      '2,1',
      '-2,-1',
      '-2,2',
      '2,2',
      '2,-2',
      '-2,-2',
      '3,0',
      '0,3',
      '0,-3',
      '-3,0',
      '-1,3',
      '-1,-3',
      '-3,1',
      '3,1',
      '1,-3',
      '3,-1',
      '1,3',
      '-3,-1',
      '-2,-3',
      '2,-3',
      '2,3',
      '3,-2',
      '3,2',
      '-3,2',
      '-2,3',
      '-3,-2',
      '-4,0',
      '0,4',
      '0,-4',
      '4,0'
    ])
  })
})
