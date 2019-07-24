import React from 'react'
import { Page, Segment, Grid, Hero, Center, Button, Header, HeaderMenu, Icon } from 'decentraland-ui'

export default class Scene extends React.Component {

  render() {
    return <Page>
      <Hero>
        <Center><h2>Scene: "Maze" at 5, -15</h2></Center>
      </Hero>
      <Grid>
        <Grid.Column width={6}>
          <Segment>
                  <HeaderMenu>
                    <HeaderMenu.Left>
                      <Header>Scene Status</Header>
                    </HeaderMenu.Left>
                    <HeaderMenu.Right>
                      <Header>
                        <Button basic>Reload &nbsp; <Icon name="refresh" /></Button>
                      </Header>
                    </HeaderMenu.Right>
                  </HeaderMenu>
            <p>Initialized</p>
            <p>Downloaded assets</p>
            <p>Current limits</p>
          </Segment>
          <Segment>
            <h4>Players on this scene</h4>
            <p>Qmfw3ef: 12345135.json</p>
          </Segment>
          <Segment>
            <h4>Mappings</h4>
            <p>Qmfw3ef: 12345135.json</p>
          </Segment>
          <Segment>
            <h4>Networked Scene events</h4>
            <p>Qmfw3ef: 12345135.json</p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
                  <HeaderMenu>
                    <HeaderMenu.Left>
                      <Header>EC Tree</Header>
                    </HeaderMenu.Left>
                    <HeaderMenu.Right>
                      <Header>
                        <Button basic>Render on Unity Engine <Icon name="chevron right" /></Button>
                        <Button basic>Render on Babylon Engine <Icon name="chevron right" /></Button>
                      </Header>
                    </HeaderMenu.Right>
                  </HeaderMenu>
            <ul>
              <li>Element 43254-f21231
                <ul>
                  <li>Component: Transform
                    <ul>
                      <li>Position: 23,43,1</li>
                      <li>Scale: 23,43,1</li>
                      <li>Rotation: 23,43,1</li>
                    </ul>
                  </li>
                  <li>Children:
                    <ul>
              <li>Element 43254-f21231</li>
              <li>Element 43254-f21231</li>
              <li>Element 43254-f21231</li>
                    </ul>
</li>
                </ul>
              </li>
            </ul>
          </Segment>
          <Segment>
            <Header>
              Running Systems
            </Header>
            <ul>
              <li>EC Synchronization</li>
              <li>Rotation</li>
            </ul>
          </Segment>
          <Segment>
            <Header>
              Event Listeners
            </Header>
            <ul>
              <li>OnClick</li>
              <li>Ethereum</li>
            </ul>
          </Segment>
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment>
            <Header>Source Code</Header>
            <pre>{`// Create a group to track all entities with a Transform component
const myGroup = engine.getComponentGroup(Transform)

// Define a System
export class RotatorSystem implements ISystem {
  // The update function runs on every frame of the game loop
  update() {
    // The function iterates over all the entities in myGroup
    for (let entity of myGroup.entities) {
      const transform = entity.getComponent(Transform)
      transform.rotate(Vector3.Left(), 0.1)
    }
  }
}

// Add the system to the engine
engine.addSystem(new RotatorSystem())

// Create an entity
const cube = new Entity()

// Give the entity a transform component
cube.addComponent(new Transform({
  position: new Vector3(5, 1, 5)
}))

// Give the entity a box shape
cube.addComponent(new BoxShape())

// Add the entity to the engine
engine.addEntity(cube)
            `}
            </pre>
          </Segment>
        </Grid.Column>
      </Grid>
    </Page>
  }

}
