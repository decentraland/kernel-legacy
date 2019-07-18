import React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import { default as Auth } from './components/auth'
import { default as Home } from './components/home'

import { history, configureStore } from './store'

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/login" render={() => Auth(store.getState().auth)} />
            <Route exact path="/" render={() => Home(store.getState())} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
