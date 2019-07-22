import { AnyAction, Middleware, Store } from 'redux'

import { connect } from '@dcl/client/dist/comms'
import { getMessageCredentials } from '@dcl/client/dist/auth/api'

import { AuthRootState } from 'modules/auth'

export type CommsStateSummary = 'Not initialized'
  | 'Starting'
  | 'Auth error'
  | 'Connected'

export type CommsActionPrototypes = [
  { type: 'Connnecting' },
  { type: 'Info', payload: any },
  { type: 'Connected!', payload: any },
  { type: 'Error', payload: any }
]

export type CommsState = {
  summary: CommsStateSummary
  retries: number
}

export type CommsRootState = {
  comms: CommsState
}

export const INITIAL_COMMS: CommsState = {
  summary: 'Not initialized',
  retries: 0
}

export function commsReducer(state?: CommsState, action?: AnyAction): CommsState {
  if (!state) {
    return INITIAL_COMMS
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case 'Connnecting':
      return { ...state, summary: 'Starting' }
    case 'Info':
      return state
    case 'Connected!':
      return { ...state, summary: 'Connected' }
    case 'Error':
      return { ...state, summary: 'Auth error' }
  }
  return state
}

/**
 * State transitions that require side-effects
 */
export const commsMiddleware = (store: Store<CommsRootState & AuthRootState>) => (next: Middleware) => (action: any) => {
  const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)

  switch (action.type) {
    case 'Login successful':
      if (needsInitialization(store, action)) {
        dispatch('Connecting')
        startConnecting(store.getState().auth.accessToken!, dispatch)
      }
      break
  }
  return next(action)
}

export function needsInitialization(store: Store<CommsRootState>, action: AnyAction): boolean {
  return store.getState().comms.summary === 'Not initialized' && action.type === 'Login successful'
}

export async function startConnecting(accessToken: string, dispatch: any) {
  try {
    debugger
    const flow = await connect(message => getMessageCredentials(message, accessToken).then(e => e as any))
    debugger
    dispatch('Connected!', flow)
  } catch (e) {
    dispatch('Error', e)
  }
}
