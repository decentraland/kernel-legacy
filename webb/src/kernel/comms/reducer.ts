import { CommsAction } from './actions'

export type CommsState = {
  connected: boolean
}
export type RootCommsState = {
  comms: CommsState
}

export const INITIAL_COMMS_STATE = {
  connected: false
}

export function commsReducer(state: CommsState = INITIAL_COMMS_STATE, action?: CommsAction): CommsState {
  return state
}
