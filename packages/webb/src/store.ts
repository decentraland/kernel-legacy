import { RouterState, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'

import { AuthState } from './modules/auth'
import { createReducer } from './reducers'

export const history = createBrowserHistory()

export type RootState = {
  router: RouterState
  auth: AuthState
}

export const configureStore = (state?: RootState) => {
  const store = createStore(createReducer(history), state, compose(applyMiddleware(routerMiddleware(history))))
  return store
}
