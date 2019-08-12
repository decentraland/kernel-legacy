import { Middleware, Store, AnyAction } from 'redux'
import { push, RouterRootState } from 'connected-react-router'
import { client } from '../systems'

export type AuthStatusSummary =
  | 'Not initialized'
  | 'Loading...'
  | 'Not logged in'
  | 'No access to Beta'
  | 'Checking email'
  | 'Awaiting verification'
  | 'Checking verification code'
  | 'Invalid verification code'
  | 'Logged in'
  | 'Logged out'

export type AuthState = {
  summary: AuthStatusSummary
  isAuthenticated: boolean
}

export type AuthRootState = {
  auth: AuthState
}

export type AuthActionTemplates = [
  { type: 'Auth initializing' },
  { type: 'Not logged in' },
  { type: 'Set email'; payload: string },
  { type: 'Need verification'; payload: string },
  { type: 'Set verification'; payload: string },
  { type: 'Login successful' },
  { type: 'Logout requested' },
  { type: 'Login error' }
]
function ReturnAuthActionMap(x: AuthActionTemplates, t: number) {
  return x[t]!
}
export type AuthAction = ReturnType<typeof ReturnAuthActionMap>

const EMPTY_AUTH_STATE: AuthState = {
  summary: 'Not initialized',
  isAuthenticated: false
}

/**
 * State transitions without side-effects
 */
export function authReducer(state = EMPTY_AUTH_STATE, action?: AuthAction | AnyAction) {
  if (!action) return state

  switch (action.type) {
    case 'Auth initialized':
      return { ...state, summary: 'Loading...' } as AuthState
    case 'Not logged in':
      return { ...state, summary: 'Not logged in' } as AuthState
    case 'Login successful':
      return {
        ...state,
        summary: 'Logged in',
        ...(action as any).payload
      } as AuthState
    case 'Login error':
      return { ...state, summary: 'Not logged in' } as AuthState
  }
  return state
}

/**
 * State transitions that require side-effects
 */
export const authMiddleware: any = (store: Store<RouterRootState & AuthRootState>) => (next: Middleware) => (
  action: any
) => {
  const dispatch = (type: any, payload?: any) =>
    typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (needsInitialization(store, action)) {
        dispatch('Auth initialized')
        checkSessionAndRedirectToHome(store, dispatch)
      }
      break
    case 'System state change':
      if (action.payload.name === 'Auth' && action.payload.state === 'Loading') {
        checkSessionAndRedirectToHome(store, dispatch)
      }
      if (action.payload.name === 'Auth' && action.payload.state === 'UserWaiting') {
        store.dispatch(push('/login'))
      }
      break
  }
  return next(action)
}

export function needsInitialization(store: Store<AuthRootState>, action: AnyAction) {
  return store.getState().auth.summary === 'Not initialized' && action.type !== 'Auth initialized'
}

export async function checkSessionAndRedirectToHome(
  store: Store<RouterRootState>,
  dispatch: (type: any, payload?: any) => any
) {
  try {
    if (client.Auth && client.Auth.auth && client.Auth.auth.isLoggedIn) {
      dispatch('Login successful', client.Auth.auth)
      if (store.getState().router.location.pathname === '/login') {
        store.dispatch(push('/'))
      }
    } else {
      if (client.Auth.readyToLoad()) {
        client.Auth.tryStart()
      }
    }
  } catch (e) {
    dispatch('Not logged in', e)
  }
}

export function currentLocation(store: Store<RouterRootState>) {
  return store.getState().router.location.pathname
}
