import { AnyAction, Middleware, Store } from 'redux'

import { AuthRootState } from 'modules/auth'

export type WorldActions = [
  { type: 'Set selected world parcel', payload: { x: number, y: number } },
]

export type WorldState = {
  parcel?: { x: number, y: number }
}

export type WorldRootState = {
  world: WorldState
}

export const INITIAL_STATE: WorldState = {}

export function worldReducer(state?: WorldState, action?: AnyAction): WorldState {
  if (!state) {
    return INITIAL_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case 'Set selected world parcel':
      return { ...state, parcel: action.payload }
    default:
      return state
  }
}

/**
 * State transitions that require side-effects
 */
export const worldMiddleware = (store: Store<WorldRootState & AuthRootState>) => (next: Middleware) => (action: any) => {
  switch (action.type) {
    case 'Set selected world parcel':
      fetchParcelInfo(store, action.payload)
      break
  }
  return next(action)
}

export function fetchParcelInfo(store: Store<WorldRootState>, parcel: { x: number, y: number }) {
  // const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
}
