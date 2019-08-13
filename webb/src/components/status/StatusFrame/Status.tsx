import React from 'react'

import { Page, Center, Grid } from 'decentraland-ui'
import { Switch, Route } from 'react-router'

import { RootState } from '~/store'
import { StatusNav } from '../StatusNav'
import Comms from '../Comms'
import Console from '../Console'
import { BuildConnectedVisualizer } from '~/components/Reusable/BuildConnectedVisualizer'
import Config from '../Config'

export default (_: RootState) => (
  <Page>
    <div className='ui container'>
      <div className='dcl hero' style={{ marginBottom: 0 }}>
        <Center>
          <h1>Webb</h1>
        </Center>
      </div>
    </div>
    <StatusNav />
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Switch>
            <Route path='/status/Comms' component={Comms} />
            <Route path='/status/MyPresence' component={BuildConnectedVisualizer('MyPresence')} />
            <Route path='/status/SceneLoader' component={BuildConnectedVisualizer('SceneLoader')} />
            <Route path='/status/Config' component={Config} />
            <Route path='/status/PeerPresence' component={BuildConnectedVisualizer('PeerPresence')} />
            <Route path='/status/Assets' component={BuildConnectedVisualizer('Assets')} />
            <Route path='/status/Auth' component={BuildConnectedVisualizer('Auth')} />
            <Route path='/status/Passports' component={BuildConnectedVisualizer('Passports')} />
            <Route path='/status/SocialModeration' component={BuildConnectedVisualizer('SocialModeration')} />
            <Route path='/status/InWorldAvatars' component={BuildConnectedVisualizer('InWorldAvatars')} />
            <Route path='/status/WorldMap' component={BuildConnectedVisualizer('WorldMap')} />
            <Route path='/status/SceneRunner' component={BuildConnectedVisualizer('SceneRunner')} />
            <Route path='/*' exact={false} component={Console} />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Page>
)
