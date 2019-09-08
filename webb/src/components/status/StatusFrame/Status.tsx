import React from 'react'
import { Route, Switch } from 'react-router'
import { RootState } from '~/kernel/store'
import Console from '../Console'
import { StatusNav } from '../StatusNav'
import { Page, Grid, Row, Column } from '~/components/liteui/dcl'

export default (_: RootState) => (
  <Page>
    <StatusNav />
    <Grid>
      <Row>
        <Column>
          <Switch>
            <Route path="/*" exact={false} component={Console} />
          </Switch>
        </Column>
      </Row>
    </Grid>
  </Page>
)
