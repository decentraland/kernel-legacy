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
  { type: 'Set verification'; payload: string },
  { type: 'Login successful' },
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
  if (!state || state === EMPTY_AUTH_STATE) return state
  switch (action.type) {
    case 'Auth initializing':
      return { ...state, summary: 'Loading...' } as AuthState
    case 'Not logged in':
      return { ...state, summary: 'Not logged in' } as AuthState
  }
  return state
}

export async function initializeAuth(store: Store<RootState>) {
  const session = await AuthLib.checkSession()
  debugger
}

export const authMiddleware = (store: Store<RootState>) => (next: Middleware) => (action: any) => {
  if (store.getState().auth.summary === 'Not initialized' && action.type !== 'Auth initialized') {
    store.dispatch({ type: 'Auth initialized' })
    initializeAuth(store)
  }
  switch (action.type) {
  }
  return next(action)
}