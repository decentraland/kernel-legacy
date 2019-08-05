import React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import { default as Assets } from '@dcl/webb/src/components/assets'
import { default as Auth } from '@dcl/webb/src/components/auth'
import { default as Home } from '@dcl/webb/src/components/status'

import { history, configureStore } from '@dcl/webb/src/store'
import Navbar from '@dcl/webb/src/components/navbar'
import World from '@dcl/webb/src/components/world'
import ParcelInfo from '@dcl/webb/src/components/world/ParcelInfo'
import Scene from '@dcl/webb/src/components/scene'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/login' component={Auth} />
            <Route exact path='/assets' component={Assets} />
            <Route exact path='/map' component={World} />
            <Route path='/scene/:scene' component={Scene} />
            <Route path='/parcel/:coordinate' component={ParcelInfo} />
            <Route exact path='/' component={Home} />
            <Redirect to='/' path='/callback' />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
