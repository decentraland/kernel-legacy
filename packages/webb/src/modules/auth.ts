import { AuthState as AuthStateLib } from '@dcl/client/dist/auth/types'
import * as AuthLib from '@dcl/client/dist/auth/lib'

import { Middleware, Store, AnyAction } from 'redux'
import { RootState } from '../store'

export type AuthStatusSummary =
  | 'Not initialized'
  | 'Loading...'
  | 'Not logged in'
  | 'No access to Beta'
  | 'Expired credentials'
  | 'User went back'
  | 'Checking email'
  | 'Awaiting verification'
  | 'Checking verification code'
  | 'Invalid verification code'
  | 'Logged in'
  | 'Logged out'

export type AuthState = AuthStateLib & {
  summary: AuthStatusSummary
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

export function authReducer(state = EMPTY_AUTH_STATE, action?: AuthAction | AnyAction) {
  if (!action) return state
  switch (action.type) {
    case 'Auth initialized':
      return { ...state, summary: 'Loading...' } as AuthState
    case 'Not logged in':
      return { ...state, summary: 'Not logged in' } as AuthState
    case 'Set email':
      return { ...state, summary: 'Checking email', email: (action as any).payload } as AuthState
    case 'Awaiting verification':
      return { ...state, summary: 'Awaiting verification' } as AuthState
    case 'Set verification':
      return { ...state, summary: 'Checking verification code' } as AuthState
    case 'Login successful':
      return { ...state, summary: 'Logged in', ...(action as any).payload } as AuthState
    case 'Login error':
      return { ...state, summary: 'Not logged in' } as AuthState
  }
  return state
}

export const authMiddleware = (store: Store<RootState>) => (next: Middleware) => (action: any) => {
  if (store.getState().auth.summary === 'Not initialized' && action.type !== 'Auth initialized' && action.type.startsWith('@')) {
    store.dispatch({ type: 'Auth initialized' })
    AuthLib.checkSession().then((result) => {
      store.dispatch({ type: 'Login successful', payload: result })
    }).catch(e => {
      store.dispatch({ type: 'Not logged in' })
    })
  }
  switch (action.type) {
    case 'Set email':
      store.dispatch({ type: 'Checking email' })
      AuthLib.getVerificationCode(action.payload).then(() => {
        store.dispatch({ type: 'Awaiting verification'})
      }).catch(() => {
        store.dispatch({ type: 'Invalid email'})
      })
      break;
    case 'Set verification':
      store.dispatch({ type: 'Checking verification code' })
      AuthLib.doAuth(store.getState().auth.email!, action.payload).then((result) => {
        store.dispatch({ type: 'Login successful', payload: result })
      }).catch(() => {
        store.dispatch({ type: 'Invalid verification code'})
      })
      break;
    case 'Logout requested':
      AuthLib.logout()
  }
  return next(action)
}
