import { AnyAction, Middleware, Store } from 'redux'

import { ProfileStore } from '@dcl/client/passports/api'
import { getBaseCatalog } from '@dcl/client/assets/wearables/base'
import { AuthRootState } from '../auth'
import { StoredProfile } from '@dcl/client/passports/types'

var profile: ProfileStore | undefined

export type PassportActions = [
  { type: 'Request passport'; payload: string },
  { type: 'Fetching passport'; payload: string },
  { type: 'Fetched passport'; payload: any },
  { type: 'Error fetching passport'; payload: any }
]

export type PassportState = {
  info: {
    [key: string]: { status: 'loading' | 'error'; data: any } | { status: 'ok'; data: StoredProfile }
  }
}

export type PassportRootState = {
  passports: PassportState
}

export const INITIAL_PASSPORTS: PassportState = {
  info: {}
}

export function passportsReducer(state?: PassportState, action?: AnyAction): PassportState {
  if (!state) {
    return INITIAL_PASSPORTS
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case 'Fetching passport':
      return {
        ...state,
        info: { ...state.info, [action.payload]: { status: 'loading' } }
      }
    case 'Profile passport':
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.userId]: { status: 'ok', data: action.payload }
        }
      }
    case 'Error fetching passport':
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

/**
 * State transitions that require side-effects
 */
export const passportsMiddleware: any = (store: Store<PassportRootState & AuthRootState>) => (next: Middleware) => (
  action: any
) => {
  const dispatch = (type: any, payload?: any) =>
    typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
  switch (action.type) {
    case 'Login successful':
      dispatch('Request passport', action.payload.userId)
      break
    case 'Request passport':
      setTimeout(() => {
        if (!(store.getState() as PassportRootState).passports.info[action.payload]) {
          fetchProfile(store.getState()!.auth.idToken!, action.payload, dispatch)
        }
      }, 100)
      break
  }
  return next(action)
}

export async function fetchProfile(accessToken: string, userId: any, dispatch: (type: any, payload?: any) => any) {
  profile = profile || new ProfileStore(await getBaseCatalog())
  try {
    dispatch('Fetching passport', userId)
    const storedProfile = await profile.getStoredProfile(accessToken, userId)
    dispatch('Fetched passport', storedProfile)
  } catch (e) {
    dispatch('Error fetching Passport', e)
  }
}
