import { AnyAction } from 'redux'
import { PassportState, INITIAL_PASSPORTS } from './types'
import { SET_PROFILE_SERVER } from './actions'
export function passportsReducer(state?: PassportState, action?: AnyAction): PassportState {
  if (!state) {
    return INITIAL_PASSPORTS
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case SET_PROFILE_SERVER:
      return {
        ...state,
        profileServer: action.payload.url
      }
    case '[Request] Passport fetch':
      return {
        ...state,
        info: { ...state.info, [action.payload.userId]: { status: 'loading' } }
      }
    case '[Success] Passport fetch':
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.userId]: action.payload.profile
        }
      }
    case '[Failure] Passport fetch':
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.userId]: { status: 'error', data: action.payload.error }
        }
      }
    default:
      return state
  }
}
