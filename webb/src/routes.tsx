import * as React from 'react'

import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import { default as Auth } from '~/components/auth'
import Status from '~/components/status/StatusFrame'

import { history } from '~/store'
import Navbar from '~/components/navbar'
import World from '~/components/world'
import ParcelInfo from '~/components/world/ParcelInfo'
import Scene from '~/components/scene'

export const Routes = (
  <>
    <ConnectedRouter history={history}>
      <>
        <Navbar />
        <Switch>
          <Redirect to='/' path='/callback' />
          <Route exact path='/login' component={Auth} />
          <Route exact path='/auth/login' component={Auth} />

          <Route exact path='/map' component={World} />
          <Route exact path='/map1' component={World} />

          <Route path='/scene/:scene' component={Scene} />
          <Route path='/parcel/:coordinate' component={ParcelInfo} />
          <Route path='/parcel/:coordinate' component={ParcelInfo} />

          <Route path='/status' component={Status} />
          <Route path='/status/*' component={Status} />

          <Route component={Status} />
        </Switch>
      </>
    </ConnectedRouter>
  </>
)
