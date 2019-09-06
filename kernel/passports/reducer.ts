import { AnyAction } from 'redux'
import { PassportState, INITIAL_PASSPORTS } from './types'
export function passportsReducer(state?: PassportState, action?: AnyAction): PassportState {
  if (!state) {
    return INITIAL_PASSPORTS
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case '[Request] Passport fetch':
      return {
        ...state,
        info: { ...state.info, [action.payload]: { status: 'loading' } }
      }
    case '[Success] Passport fetch':
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.userId]: action.payload
        }
      }
    case '[Failure] Passport fetch':
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.userId]: { status: 'error', data: action.payload }
        }
      }
    default:
      return state
  }
}
