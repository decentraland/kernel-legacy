import React from 'react'

import { Page, Grid } from 'decentraland-ui'
import { Switch, Route } from 'react-router'

import { RootState } from '~/store'
import { StatusNav } from '../StatusNav'
import Comms from '../Comms'
import Console from '../Console'
import { BuildConnectedVisualizer } from '~/components/Reusable/BuildConnectedVisualizer'
import Config from '../Config'
import WorldStatus from '~/components/world/World'
import MyPresence from '../MyPresence'
import Auth from '../Auth/Auth'

export default (_: RootState) => (
  <Page>
    <StatusNav />
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Switch>
            <Route path='/status/Comms' component={Comms} />
            <Route path='/status/MyPresence' component={MyPresence} />
            <Route path='/status/SceneLoader' component={BuildConnectedVisualizer('SceneLoader')} />
            <Route path='/status/Config' component={Config} />
            <Route path='/status/PeerPresence' component={BuildConnectedVisualizer('PeerPresence')} />
            <Route path='/status/Assets' component={BuildConnectedVisualizer('Assets')} />
            <Route path='/status/Auth' component={Auth} />
            <Route path='/status/Passports' component={BuildConnectedVisualizer('Passports')} />
            <Route path='/status/SocialModeration' component={BuildConnectedVisualizer('SocialModeration')} />
            <Route path='/status/InWorldAvatars' component={BuildConnectedVisualizer('InWorldAvatars')} />
            <Route path='/status/WorldMap' component={WorldStatus} />
            <Route path='/status/SceneRunner' component={BuildConnectedVisualizer('SceneRunner')} />
            <Route path='/*' exact={false} component={Console} />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Page>
)
