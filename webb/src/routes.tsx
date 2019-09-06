import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import Atlas from '~/components/atlas'
import ParcelInfo from '~/components/atlas/ParcelInfo'
import Navbar from '~/components/navbar'
import Scene from '~/components/scene'
import Status from '~/components/status/StatusFrame'
import { history } from '~/store'

export const Routes = (
  <>
    <ConnectedRouter history={history}>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/map' component={Atlas} />
          <Route exact path='/map1' component={Atlas} />

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
