import React from 'react'
import { Hero, Grid, Atlas, Page, Center, Layer, Segment, Address, Mana, HeaderMenu, Header, Button, Icon, Tabs } from 'decentraland-ui'

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
                <Segment>
                  <HeaderMenu>
                    <HeaderMenu.Left>
                      <Header>Ownership</Header>
                    </HeaderMenu.Left>
                    <HeaderMenu.Right>
                      <Header>
                        <Button basic>See on Marketplace
            <Icon name="chevron right" /></Button>
                      </Header>
                    </HeaderMenu.Right>
                  </HeaderMenu>
                  <p>Part of Estate #4132</p>
                  <p>Last price was <Mana size='small'>1234</Mana></p>
                  <p>Owned by <Address value='0x63efa'/></p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={16}>
                <Segment>
                  <HeaderMenu>
                    <HeaderMenu.Left>
                      <Header>Content</Header>
                    </HeaderMenu.Left>
                    <HeaderMenu.Right>
                      <Header>
                        <Button basic>Start scene
            <Icon name="chevron right" /></Button>
                      </Header>
                    </HeaderMenu.Right>
                  </HeaderMenu>
                  <p>
                    Last deployment: 4/Jul/2919
                  </p>
                  <p>
                    By address <Address value='0x35r28175f' />
                  </p>
                  <p>
                    Scene ID: 0x298567987dfg972348979234
                  </p>
                <Tabs>
                  <Tabs.Tab active>
                    Scene v2 Description
                  </Tabs.Tab>
                  <Tabs.Tab>
                    Legacy Mappings
                  </Tabs.Tab>
                </Tabs>
                    <h4>Scene Mappings:</h4>
                  <pre>
                  {JSON.stringify({
"data": [
{
"root_cid": "QmPpoSXkgFqxsbC1tFqT5owmdXs3uU7x8u54SnHKMHt9Kk",
"scene_cid": "QmbqDjt9gB9GBNsYD2GDQrQRD2b3i55oz4btU7ZNqnDk6r",
"content": {
"parcel_id": "11,11",
"contents": [
{
"file": "scene.json",
"hash": "QmbqDjt9gB9GBNsYD2GDQrQRD2b3i55oz4btU7ZNqnDk6r"
},
{
"file": "Fork_B.glb",
"hash": "QmWgMrGGxcyb6ZoRDGvzYMxTTLwajRzxBSpVEjfFyoQ3a9"
},
{
"file": "OpenRoad_B.glb",
"hash": "QmbqZNa8P7aXzMMVJT33ipTszxk5aHGpHbjbqejfs14UXZ"
},
{
"file": "game.js",
"hash": "QmacyWXcZw7GsW56eZwasfusGbQJMJQM32mtW93tcPxFhL"
}
],
"root_cid": "QmPpoSXkgFqxsbC1tFqT5owmdXs3uU7x8u54SnHKMHt9Kk",
"publisher": "0x13371b17ddb77893cd19e10ffa58461396ebcc19"
}
}
]
}, null, 2)}
                  </pre>
                  <h4>Scene description:</h4>
                  <pre>
                    {
                      JSON.stringify({
                        "display": {
                        "title": "Road at 11,11 (open road OpenRoad_B)",
                        "favicon": "favicon_asset"
                        },
                        "contact": {
                        "name": "",
                        "email": ""
                        },
                        "owner": "",
                        "scene": {
                        "parcels": [
                        "11,11"
                        ],
                        "base": "11,11"
                        },
                        "communications": {
                        "type": "webrtc",
                        "signalling": "https://signalling-01.decentraland.org"
                        },
                        "policy": {
                        "contentRating": "E",
                        "fly": true,
                        "voiceEnabled": true,
                        "blacklist": [],
                        "teleportPosition": ""
                        },
                        "main": "game.js",
                        "tags": []
                        }, null, 2)
                    }
                  </pre>
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Page>
  }
}
