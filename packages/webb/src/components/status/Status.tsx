import React from 'react'

import { Page, Center, Logo, Grid, Segment, Hero, Atlas } from 'decentraland-ui'

import { RootState } from 'store'
import { default as CommsStatus } from './CommsStatus/index'

export default (_: RootState) => <Page>
  <Hero>
    <Center>
      <Logo/> <h1>Webb</h1>
    </Center>
  </Hero>
  <Grid>
    <Grid.Row>
      <Grid.Column width={5}>
        <CommsStatus />
        <Segment>
          <h3>Chat</h3>
        </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
          <h3>Passport</h3>
          <p>name: <strong>eordano</strong></p>
          <p>userId: <strong>email|f3129234u5</strong></p>
          <p>bio: <strong>Codin' in the metaverse</strong></p>
          <p>joined: <strong>1 / Jul / 2019</strong></p>
          <p>avatar: <a href='/'><strong>see detail</strong></a></p>
        </Segment>
        <Segment>
          <h3>Presence</h3>
          <p>position: <strong>10,30</strong> (15, 65, 20)</p>
          <p>rotation: <strong>{'{ 1, 0, 0, 3 }'}</strong></p>
          <p>current scene: <a href='/'><strong>10,82</strong></a></p>
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment>
          <h3>Scenes</h3>
          <p><strong>Position:</strong> 0,0</p>
          <div style={{ height: '140px', paddingBottom: '10px' }}>
            <Atlas x={10} y={10}/>
          </div>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</Page>
