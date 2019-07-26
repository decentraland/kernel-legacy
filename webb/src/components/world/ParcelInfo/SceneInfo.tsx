import React from 'react'

import { Address, Button, Header, HeaderMenu, Icon, Segment, Tabs } from 'decentraland-ui'
import { NoDeployment } from './NoDeployment'
import { LoadingSceneInfo } from './LoadingSceneInfo'

import { scene as sceneUrl } from 'locations'

export class SceneInfo extends React.Component<any> {
  render() {
    const { x, y } = this.props.parcel;
    const coordinate = `${x}.${y}`;
    const loading = !this.props.parcelData[coordinate]
      || this.props.parcelData[coordinate].loading
      || !this.props.coordinateToScene[coordinate]
      || this.props.coordinateToScene[coordinate].loading;
    if (loading) {
      return LoadingSceneInfo()
    }
    const empty = this.props.coordinateToScene[coordinate].empty
    if (empty || !this.props.coordinateToScene[coordinate]) {
      return NoDeployment()
    }
    const scene = this.props.coordinateToScene[coordinate];
    const loadingMapping = !this.props.mappings[scene]
      || this.props.mappings[scene].loading
      || !this.props.sceneJson[scene]
      || this.props.sceneJson[scene].loading;
    if (loadingMapping) {
      return LoadingSceneInfo()
    }
    const mappings = this.props.mappings[scene];
    const sceneJson = this.props.sceneJson[scene];
    return <Segment>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Scene: <Address value={scene} /></Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Header>
            <Button onClick={() => this.props.push(sceneUrl(scene))} basic>Start scene <Icon name="chevron right" /></Button>
          </Header>
        </HeaderMenu.Right>
      </HeaderMenu>
      <p>Full id: </p>
      <pre>{scene}</pre>
      <TabbedSceneInfo {...{sceneJson, mappings }} />
    </Segment>
  }
}

export class TabbedSceneInfo extends React.Component<any, any> {
  state = {
    tab: 'scene.json'
  }
  _tab: { [key: string]: any } = {}
  setTab = (name: string) => this._tab[name] ? this._tab[name] : this._tab[name] = () => this.setState({ tab: name })
  render() {
    const { sceneJson, mappings } = this.props
    const tabs = [
      { name: 'scene.json', data: sceneJson, title: 'scene.json' },
      { name: 'mappings.json', data: mappings, title: 'Legacy mappings file' }
    ]
    return <>
      { tabs.map(
          ({ name, title }) => {
            return <Tabs.Tab key={name} active={this.state.tab === name} onClick={this.setTab(name)}>
              {title}
            </Tabs.Tab>
          }
        )
      }
      { tabs.filter(t => this.state.tab === t.name).map(({ name, data }) => <pre key={name + '-'}>{JSON.stringify(data, null, 2)}</pre> ) }
    </>
  }
}
