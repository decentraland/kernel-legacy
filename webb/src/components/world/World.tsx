import React from 'react'
import { BuildConnectedVisualizer } from '../Reusable/BuildConnectedVisualizer'
import { Grid, Segment } from 'decentraland-ui'

export default class WorldStatus extends React.PureComponent {
  render() {
    const Inspector = BuildConnectedVisualizer('WorldMap')
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Segment>Exploring</Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>Mini map</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>{<Inspector />}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
