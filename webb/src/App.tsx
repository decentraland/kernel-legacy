import React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import { default as Auth } from 'components/auth/index'
import { default as Home } from 'components/home'

import { history, configureStore } from 'store'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/" render={() => Home(store.getState())} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
