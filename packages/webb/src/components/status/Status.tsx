import React from 'react'

import { Page, Center, Logo, Grid, Segment, Hero, Atlas } from 'decentraland-ui'

import { RootState } from 'store'
import { default as CommsStatus } from './CommsStatus/index'
import MyTerminal from './Console';

export default (_: RootState) => <Page>
  <Hero>
    <Center>
      <Logo/> <h1>Webb</h1>
    </Center>
  </Hero>
  <Grid>
    <Grid.Row>
      <Grid.Column width={6}>
        <CommsStatus />
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment>
          <h3>Passport</h3>
          <p>name: <strong>eordano</strong></p>
          <p>userId: <strong>email|f3129234u5</strong></p>
          <p>bio: <strong>Codin' in the metaverse</strong></p>
          <p>joined: <strong>1 / Jul / 2019</strong></p>
          <p>avatar: <a href='/'><strong>see detail</strong></a></p>
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment>
          <h3>Presence</h3>
          <p>position: <strong>10,30</strong> (15, 65, 20)</p>
          <p>rotation: <strong>{'{ 1, 0, 0, 3 }'}</strong></p>
          <p>current scene: <a href='/'><strong>10,82</strong></a></p>
        </Segment>
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
