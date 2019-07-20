import React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import { default as Assets } from 'components/assets'
import { default as Auth } from 'components/auth'
import { default as Home } from 'components/status'

import { history, configureStore } from 'store'
import Navbar from 'components/navbar'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/assets" component={Assets} />
            <Route exact path="/" render={() => Home(store.getState())} />
            <Redirect to="/" path="/callback" />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
