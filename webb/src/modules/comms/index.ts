import { AnyAction, Middleware, Store } from 'redux'

export type CommsStateSummary =
  | 'Not initialized'
  | 'Starting'
  | 'Auth error'
  | 'Waiting for login...'
  | 'Connecting...'
  | 'Establishing ICE connection...'
  | 'Establishing data channels...'
  | 'Connected!'

export type CommsActionPrototypes = [
  { type: 'Connnecting' },
  { type: 'Info'; payload: any },
  { type: 'Connecting'; payload: any },
  { type: 'Waiting'; payload: any },
  { type: 'Establishing ICE connection...'; payload: any },
  { type: 'Establishing data channels...'; payload: any },
  { type: 'Connected!'; payload: any },
  { type: 'Error'; payload: any }
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
  return state
}

export const commsMiddleware: any = (_: Store<CommsRootState>) => {
  return (next: Middleware) => (action: any) => {
    return next(action)
  }
}
