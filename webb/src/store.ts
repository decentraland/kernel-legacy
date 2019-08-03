import { RouterState, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'

import { AuthState, authMiddleware } from 'dcl/webb/src/modules/auth'
import { commsMiddleware, CommsState } from 'dcl/webb/src/modules/comms'
import { passportsMiddleware } from 'dcl/webb/src/modules/passports'
import { assetsMiddleware, AssetsState } from 'dcl/webb/src/modules/assets'
import { worldMiddleware, WorldState } from 'dcl/webb/src/modules/world'

import { createReducer } from 'dcl/webb/src/reducers'

export const history: any = createBrowserHistory()

export type RootState = {
  router: RouterState
  auth: AuthState
  assets: AssetsState
  comms: CommsState
  world: WorldState
}

declare var window: any
const enhance =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'webb'
      })
    : compose

export const configureStore: any = (state?: RootState) => {
  const store = createStore(
    createReducer(history),
    state,
    enhance(
      applyMiddleware(
        routerMiddleware(history),
        authMiddleware as any,
        commsMiddleware as any,
        assetsMiddleware as any,
        worldMiddleware as any,
        passportsMiddleware as any
      )
    )
  )
  return store
}