import React from 'react'

import { Page, Center, Grid, Segment, Hero } from 'decentraland-ui'

import { RootState } from '~/store'
import { default as CommsStatus } from './CommsStatus/index'
import { MyTerminal } from './Console'
import SystemStatus from './SystemStatus'

export default (_: RootState) => (
  <Page>
    <Hero>
      <Center>
        <h1>Webb</h1>
      </Center>
    </Hero>
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <CommsStatus />
        </Grid.Column>
        <Grid.Column width={10}>
          <SystemStatus />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <h3>Console</h3>
            <MyTerminal />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Page>
)
