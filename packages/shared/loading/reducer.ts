import { AnyAction } from 'redux'
import {
  ExecutionLifecycleEvent,
  ExecutionLifecycleEventsList,
  helpTexts,
  NOT_STARTED,
  ROTATE_HELP_TEXT
} from './types'

export type LoadingState = {
  status: ExecutionLifecycleEvent
  helpText: number
}
export function loadingReducer(state?: LoadingState, action?: AnyAction) {
  if (!state) {
    return { status: NOT_STARTED, helpText: 0 }
  }
  if (!action) {
    return state
  }
  if (action.type in ExecutionLifecycleEventsList) {
    return { status: action.type, helpText: state.helpText }
  }
  if (action.type === ROTATE_HELP_TEXT) {
    const newValue = state.helpText + 1
    return { status: state.status, helpText: newValue >= helpTexts.length ? 0 : newValue }
  }
  return state
}
