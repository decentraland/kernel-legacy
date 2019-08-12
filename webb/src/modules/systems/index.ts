import { MainController } from '@dcl/client'
import { Observable } from '@dcl/utils'
import { Store, Middleware } from 'redux'

const client = new MainController.MainController()

export type SystemsState = {
  status: { [key: string]: string }
  deps: { [key: string]: string[] }
}
export type SystemsRootState = {
  systems: SystemsState
}

const INITIAL_STATE = {
  status: {},
  deps: {}
}

const anyUpdate = new Observable<{ name: string; state: string }>()

{
  for (let system of client.subsystems) {
    const name = system.name
    INITIAL_STATE.status[system.name] = system.status
    INITIAL_STATE.deps[system.name] = [system.deps.map(_ => _.name)]
    system.statusObservable.add(state => anyUpdate.notifyObservers({ name, state }))
  }
}

export const UPDATE_STATUS = 'System state change'
export const START_SYSTEM = 'Start System'

export function systemsReducer(
  state = INITIAL_STATE,
  action?: { type: string; payload: { name: string; state: string } }
): SystemsState {
  if (!state) {
    return INITIAL_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case UPDATE_STATUS:
      return { ...state, status: { ...state.status, [action.payload.name]: action.payload.state } }
  }
  return state
}

export const systemsMiddleware: any = (store: Store<SystemsRootState>) => {
  const dispatch = (type: any, payload?: any) =>
    typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
  anyUpdate.add(({ name, state }) => {
    dispatch('System state change', { name, state })
  })
  return (next: Middleware) => (action: any) => {
    const result = next(action)
    switch (action.type) {
      case '@@INIT':
        break
      case START_SYSTEM:
        client[action.payload.name].tryStart()
        break
    }
    return result
  }
}
