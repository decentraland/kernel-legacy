import { RouterState, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'

import { AuthState, authMiddleware } from 'modules/auth'
import { createReducer } from 'reducers'

export const history = createBrowserHistory()

export type RootState = {
  router: RouterState
  auth: AuthState
}

declare var window: any
const enhance =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'webb'
      })
    : compose

export const configureStore = (state?: RootState) => {
  const store = createStore(
    createReducer(history),
    state,
    enhance(applyMiddleware(routerMiddleware(history), authMiddleware as any))
  )
  return store
}
