import { AuthState as AuthStateLib } from '@dcl/client/auth/types'
import * as AuthLib from '@dcl/client/auth/lib'
import { Middleware, Store } from 'redux'
import { RootState } from '../store'

export type AuthStatusSummary =
  | 'Not initialized'
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
  { type: 'Auth initializing'; payload?: string },
  { type: 'Set email'; payload: string },
  { type: 'Set verification'; payload: string },
  { type: 'Login successful'; payload: any },
  { type: 'Login error'; payload: any }
]
function ReturnAuthActionMap(x: AuthActionTemplates, t: number) {
  return x[t]!
}
export type AuthAction = ReturnType<typeof ReturnAuthActionMap>

const EMPTY_AUTH_STATE: AuthState = {
  summary: 'Not logged in',
  isAuthenticated: false,
  userWentBack: false
}

export function authReducer(state = EMPTY_AUTH_STATE, action?: AuthAction) {
  if (!action) return state
  if (!state || state === EMPTY_AUTH_STATE) return state
  switch (action.type) {
    case 'Auth initializing':
      return { ...state, summary: 'Not logged in' }
  }
  return state
}

export function initializeAuth(store: Store<RootState>) {
  store.dispatch({ type: 'Auth initialized' })
  checkSession()
}

export const authMiddleware = (store: Store<RootState>) => (next: Middleware) => (action: any) => {
  if (store.getState().auth.summary === 'Not initialized') {
    initializeAuth(store)
  }
  switch (action.type) {
  }
  return next(action)
}
