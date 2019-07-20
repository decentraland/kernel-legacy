import React from 'react'
import { Page, Grid } from 'decentraland-ui';

export class Assets extends React.PureComponent {
  render() {
    return <Page>
      <Grid>
        <Grid.Column width={6}>
          <ul>
            <li>
              Wearables
            </li>
            <li>
              Placeable
            </li>
          </ul>
        </Grid.Column>
      </Grid>
    </Page>
  }
}
