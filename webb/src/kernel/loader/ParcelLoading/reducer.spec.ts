import { INITIAL_PARCEL_LOADING_STATE, parcelLoadingReducer } from './reducer'
import { showParcelLoading, hideParcelLoading } from './actions'

describe('parcel loading is simple', () => {
  it('marks a parcel as loaded when requested', () => {
    let state = INITIAL_PARCEL_LOADING_STATE
    state = parcelLoadingReducer(state, showParcelLoading({ x: 0, y: 0 }))
    expect(state.parcelCurrentlyLoading['0,0']).toBe(true)
  })
  it('and hides it as well', () => {
    let state = INITIAL_PARCEL_LOADING_STATE
    state = parcelLoadingReducer(state, hideParcelLoading({ x: 0, y: 0 }))
    expect(state.parcelCurrentlyLoading['0,0']).toBeFalsy()
  })
})
