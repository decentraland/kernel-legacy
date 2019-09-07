import { Grid, Page } from 'decentraland-ui'
import React from 'react'
import { Route, Switch } from 'react-router'
import { RootState } from '~/kernel/store'
import Console from '../Console'
import { StatusNav } from '../StatusNav'

export default (_: RootState) => (
  <Page>
    <StatusNav />
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Switch>
            <Route path='/*' exact={false} component={Console} />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Page>
)
