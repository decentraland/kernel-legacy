import * as React from 'react'
import { Grid, Segment } from 'decentraland-ui'
import { default as CommsStatus } from './CommsStatus'
import { BuildConnectedVisualizer } from '~/components/Reusable/BuildConnectedVisualizer'

export default class Comms extends React.PureComponent {
  render() {
    const Inspector = BuildConnectedVisualizer('Comms')
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <CommsStatus />
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>Placeholder for logs</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>{<Inspector />}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
