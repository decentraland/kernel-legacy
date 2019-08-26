import React from 'react'

import { Center, Grid, Hero, Page } from 'decentraland-ui'

import { OwnershipInfo } from './OwnershipInfo'
import { SceneInfo } from './SceneInfo'
import { MapPreview } from './MapPreview'

export default class ParcelInfo extends React.Component<any> {

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
            <MapPreview x={parseInt(this.props.parcel.x, 10)} y={parseInt(this.props.parcel.y, 10)} {...this.props}/>
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
