import { routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createReducer } from '~/reducers'

export const history: any = createBrowserHistory()

export type RootState = {
  router: RouterState
}

declare var window: any
const enhance =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'webb'
      })
    : compose

export const configureStore: any = (state?: RootState) => {
  const store = createStore(createReducer(history), state, enhance(applyMiddleware(routerMiddleware(history))))
  return store
}
