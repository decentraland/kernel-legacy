import React from 'react'

import { Atlas, Center, Grid, Hero, Layer, Page } from 'decentraland-ui'

import { OwnershipInfo } from './OwnershipInfo'
import { SceneInfo } from './SceneInfo'

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
          <Grid.Column width={4} style={{ maxHeight: '600px' }}>
            <Atlas x={this.props.parcel.x} y={this.props.parcel.y} layers={[this.hoverStrokeLayer, this.hoverFillLayer]} isDraggable={false} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid>
              <Grid.Column width={8}>
                <h2><a href='/map' onClick={(ev) => { ev.preventDefault(); this.props.goto('/map') } }>Genesis City</a> / <a href={`${this.props.parcel.x}.${this.props.parcel.y}`}>{this.props.parcel.x}, {this.props.parcel.y}</a></h2>
              </Grid.Column>
              <Grid.Column width={16}>
                <OwnershipInfo {...this.props.parcel} parcelData={this.props.parcelData[`${this.props.parcel.x}.${this.props.parcel.y}`]} />
              </Grid.Column>
              <Grid.Column width={16}>
                <SceneInfo {...this.props} push={this.props.goto} />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Page>
  }
}
