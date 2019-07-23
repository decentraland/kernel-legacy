import { AnyAction, Middleware, Store } from 'redux'
import { Auth } from 'decentraland-auth'

import { connect } from '@dcl/client/dist/comms'
import { intersectLogger } from '@dcl/utils/dist/Logger'

import { AuthRootState } from 'modules/auth'

export type CommsStateSummary = 'Not initialized'
  | 'Starting'
  | 'Auth error'
  | 'Waiting for login...'
  | 'Connecting...'
  | 'Establishing ICE connection...'
  | 'Establishing data channels...'
  | 'Connected!'

export type CommsActionPrototypes = [
  { type: 'Connnecting' },
  { type: 'Info', payload: any },
  { type: 'Connecting', payload: any },
  { type: 'Waiting', payload: any },
  { type: 'Establishing ICE connection...', payload: any },
  { type: 'Establishing data channels...', payload: any },
  { type: 'Connected!', payload: any },
  { type: 'Error', payload: any }
]

export type CommsState = {
  summary: CommsStateSummary
  log: string[]
  retries: number
}

export type CommsRootState = {
  comms: CommsState
}

export const INITIAL_COMMS: CommsState = {
  summary: 'Not initialized',
  log: [],
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
    case 'Waiting':
      return { ...state, summary: 'Waiting for login...' }
    case 'Connecting':
      return { ...state, summary: 'Connecting...' }
    case 'Info':
      return state
    case 'ICE Connection Established':
      return { ...state, summary: 'Establishing data channels...' }
    case 'Establishing ICE connection...':
      return { ...state, summary: 'Establishing ICE connection...' }
    case 'Connected!':
      return { ...state, summary: 'Connected!' }
    case 'Comms log':
      return { ...state, log: [...state.log, action.payload[0]] }
    case 'Error':
      return { ...state, summary: 'Auth error' }
  }
  return state
}

export const overridenEvents = intersectLogger('Broker: ')

/**
 * State transitions that require side-effects
 */
export const commsMiddleware = (store: Store<CommsRootState & AuthRootState>) => {
  for (let key of ['debug', 'error', 'log', 'warn', 'info', 'debug', 'trace']) {
    overridenEvents.on(key, (...args) => {
      store.dispatch({ type: 'Comms log', payload: args })
      if (args[0] === 'signaling state: stable') {
        store.dispatch({ type: 'Establishing ICE connection...' })
      }
      if (args[0] === 'ice connection state: connected') {
        store.dispatch({ type: 'ICE Connection Established'})
      }
      if (args[0] === 'DataChannel "reliable" has opened') {
        store.dispatch({ type: 'Connected!' })
      }
    })
  }
  return (next: Middleware) => (action: any) => {
    const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)

    switch (action.type) {
      case 'Login successful':
        if (needsInitialization(store, action)) {
          startConnecting(dispatch)
        }
        break
    }
    return next(action)
  }
}

export function needsInitialization(store: Store<CommsRootState>, action: AnyAction): boolean {
  return store.getState().comms.summary === 'Not initialized' && action.type === 'Login successful'
}

export async function startConnecting(dispatch: any) {
  try {
    const auth = new Auth()
    await auth.login()
    await auth.getAccessTokenData()
    const flow = await connect(async (message: any) => {
      return auth.getMessageCredentials(message)
    })
    dispatch('Connecting', flow)
  } catch (e) {
    dispatch('Error', e)
  }
}
