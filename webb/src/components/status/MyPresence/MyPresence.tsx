import * as React from 'react'
import { MyPresenceActionProperties, MyPresenceStateProperties } from './MyPresence.types'
import { BuildConnectedVisualizer } from '~/components/Reusable/BuildConnectedVisualizer'
import { DefaultDataVisualizer } from '~/components/Reusable/DefaultDataVisualizer'
import { Grid, Segment } from 'decentraland-ui'

export default class MyPresence extends React.PureComponent<MyPresenceActionProperties & MyPresenceStateProperties> {
  render() {
    const Inspector = BuildConnectedVisualizer('MyPresence')
    const { lastPlayerPosition, lastPlayerPositionReport, lastTimeUpdatedUrl } = this.props
    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <DefaultDataVisualizer
                shouldExpandNode={() => true}
                data={{
                  lastPlayerPosition,
                  lastPlayerPositionReport,
                  lastTimeUpdatedUrl: Math.round(lastTimeUpdatedUrl)
                }}
              ></DefaultDataVisualizer>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>Mini map</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>{<Inspector />}</Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
