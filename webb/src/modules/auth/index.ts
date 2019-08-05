import { Middleware, Store, AnyAction } from 'redux'
import { push, RouterRootState } from 'connected-react-router'

import { AuthState as AuthStateLib } from 'dcl/client/auth/types'
import * as AuthLib from 'dcl/client/auth/lib'

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

export type AuthState = AuthStateLib & {
  summary: AuthStatusSummary
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
  isAuthenticated: false,
  userWentBack: false
}

/**
 * State transitions without side-effects
 */
export function authReducer(
  state = EMPTY_AUTH_STATE,
  action?: AuthAction | AnyAction
) {
  if (!action) return state

  switch (action.type) {
    case 'Auth initialized':
      return { ...state, summary: 'Loading...' } as AuthState
    case 'Not logged in':
      return { ...state, summary: 'Not logged in' } as AuthState
    case 'Set email':
      return {
        ...state,
        summary: 'Checking email',
        email: (action as any).payload
      } as AuthState
    case 'Awaiting verification':
      return { ...state, summary: 'Awaiting verification' } as AuthState
    case 'Set verification':
      return { ...state, summary: 'Checking verification code' } as AuthState
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
export const authMiddleware: any = (
  store: Store<RouterRootState & AuthRootState>
) => (next: Middleware) => (action: any) => {
  const dispatch = (type: any, payload?: any) =>
    typeof type === 'string'
      ? store.dispatch({ type, payload })
      : store.dispatch(type)

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (needsInitialization(store, action)) {
        dispatch('Auth initialized')
        checkSessionAndRedirectToHome(store, dispatch)
      }
      break
    case 'Set email':
      dispatch('Checking email')
      fetchVerificationCode(dispatch, action)
      break
    case 'Set verification':
      if (store.getState().auth.summary === 'Awaiting verification') {
        dispatch('Checking verification code')
        checkVerificationCode(store, dispatch, action)
      }
      break
    case 'Logout requested':
      AuthLib.logout()
      break
  }
  return next(action)
}

export function needsInitialization(
  store: Store<AuthRootState>,
  action: AnyAction
) {
  return (
    store.getState().auth.summary === 'Not initialized' &&
    action.type !== 'Auth initialized'
  )
}

export async function checkSessionAndRedirectToHome(
  store: Store<RouterRootState>,
  dispatch: (type: any, payload?: any) => any
) {
  try {
    const result = await AuthLib.checkSession()
    dispatch('Login successful', result)
    if (store.getState().router.location.pathname === '/login') {
      store.dispatch(push('/'))
    }
  } catch (e) {
    dispatch('Not logged in', e)
  }
}

export async function fetchVerificationCode(
  dispatch: (type: string, payload?: any) => any,
  action: AnyAction
) {
  try {
    await AuthLib.getVerificationCode(action.payload)
    dispatch('Awaiting verification')
  } catch (e) {
    dispatch('Invalid email', e)
  }
}

export async function checkVerificationCode(
  store: Store<RouterRootState & AuthRootState>,
  dispatch: (type: any, payload?: any) => any,
  action: AnyAction
) {
  try {
    const result = await AuthLib.doAuth(
      store.getState().auth.email!,
      action.payload
    )
    dispatch('Login successful', result)
    if (currentLocation(store) === '/login') {
      dispatch(push('/'))
    }
  } catch (e) {
    dispatch('Invalid verification code')
  }
}

export function currentLocation(store: Store<RouterRootState>) {
  return store.getState().router.location.pathname
}
