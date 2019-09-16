import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createReducer } from './reducers'
import { configureDownloadServer as configureSceneIdServer } from './loader/PositionToSceneId/actions'
import { configureDownloadServer as configureManifestServer } from './loader/SceneIdToSceneManifest/types'
import { setProfileServer } from './passports/actions'
import { rootSaga } from './rootSaga'
import { configureLineOfSightRadius } from './userLocation/ParcelSight/actions'

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

export var store

export const configureStore: any = (state?: RootState) => {
  const sagasMiddleware = createSagaMiddleware()
  store = createStore(
    createReducer(history),
    state,
    enhance(applyMiddleware(routerMiddleware(history), sagasMiddleware))
  )
  store.dispatch(configureLineOfSightRadius(4))
  store.dispatch(configureSceneIdServer('https://content.decentraland.org/'))
  store.dispatch(configureManifestServer('https://content.decentraland.org/'))
  store.dispatch(setProfileServer('https://avatars-api.decentraland.org/'))
  sagasMiddleware.run(rootSaga)
  return store
}
