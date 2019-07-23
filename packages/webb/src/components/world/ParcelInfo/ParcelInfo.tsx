import React from 'react'
import { Hero, Grid, Atlas, Page, Center, Layer, Breadcrumb } from 'decentraland-ui'

export default class ParcelInfo extends React.Component<any> {

  isHighlighted = (x: number, y: number) => this.props.parcel.x === x && this.props.parcel.y === y

  hoverFillLayer: Layer = (x, y) => {
    if (this.isHighlighted(x, y)) {
      return {
        color: '#99ff90',
        scale: 1.2,
      };
    }
    return null;
  }

  hoverStrokeLayer: Layer = (x, y) => {
    if (this.isHighlighted(x, y)) {
      return {
        color: '#44ff00',
        scale: 1.5,
      };
    }
    return null;
  }

  render() {
    return <Page>
      <Hero>
        <Center>
        <h1>
         World
        </h1></Center>
      </Hero>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} style={{ minHeight: '600px' }}>
            <Atlas x={this.props.parcel.x} y={this.props.parcel.y} layers={[this.hoverStrokeLayer, this.hoverFillLayer]} isDraggable={false} />
          </Grid.Column>
          <Grid.Column width={12}>
            <h2><Breadcrumb><a href='/map' onClick={(ev) => { ev.preventDefault(); this.props.goto('/map') } }>World</a> /</Breadcrumb> Parcel: {this.props.parcel.x}, {this.props.parcel.y}</h2>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Page>
  }
}
