import React from 'react'
import { Page, Grid, Tabs, Segment, Hero, Center } from 'decentraland-ui'
import { AssetsState } from 'modules/assets'

export type ToggleStatus = {
  currentPack: string
  currentCategory: string
  currentAsset: string
}

function humanize(key: string, object?: any): string {
  if (object && object.i18n) {
    return object.i18n.en
  }
  return ({
    body_shape: 'Body shape',
    earring: 'Earrings',
    eyebrows: 'Eyebrows',
    eyes: 'Eyes',
    eye_wear: 'Eye wear',
    facial_hair: 'Facial hair',
    feet: 'Feet',
    hair: 'Hair',
    lower_body: 'Lower body clothing',
    mouth: 'Mouth',
    tiara: 'Tiaras',
    upper_body: 'Upper body cloting',
    decorations: 'Decorations',
    furniture: 'Furniture',
    structures: 'Structures',
    female_body: 'Base female body type',
    male_body: 'Base male body type',
    nature: 'Nature',
    ground: 'Ground',
    tiles: 'Tiles',
    'year of the pig': 'All YotP assets'
  } as any)[key] || key
}
export class Assets extends React.PureComponent<AssetsState & { switch: any }, ToggleStatus> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentAsset: '',
      currentPack: '',
      currentCategory: ''
    }
  }

  packSetters: { [key: string]: Function } = {}
  categorySetters: { [key: string]: Function } = {}
  assetSetter: { [key: string]: Function } = {}

  setCurrentPack(key: string) {
    if (!this.packSetters[key]) {
      this.packSetters[key] = () => this.setState({ currentPack: key, currentAsset: '', currentCategory: '' })
    }
    return this.packSetters[key]
  }
  setCurrentCategory(key: string) {
    if (!this.categorySetters[key]) {
      this.categorySetters[key] = () => this.setState({ currentCategory: key, currentAsset: '' })
    }
    return this.categorySetters[key]
  }
  setCurrentAsset(key: string) {
    if (!this.assetSetter[key]) {
      this.assetSetter[key] = () => this.setState({ currentAsset: key })
    }
    return this.assetSetter[key]
  }

  get currentPlaceable() {
    return this.props.currentTab === 'placeable'
  }
  currentTab = (packId: string) => this.props.packs[packId].placeable === this.currentPlaceable

  getPacks() {
    return Object.keys(this.props.packs).filter(this.currentTab).map(key => ({
      id: key,
      title: this.props.packs[key].title,
      action: this.setCurrentPack(key)
    }))
  }
  getCategories() {
    return Object.keys(this.props.contents[this.state.currentPack]).map(key => ({
      id: key,
      title: humanize(key, this.props.contents[key]),
      action: this.setCurrentCategory(key)
    }))
  }
  getItems() {
    return this.props.contents[this.state.currentPack][this.state.currentCategory].map(asset => ({
      id: asset.id,
      title: humanize(asset.name, asset),
      action: this.setCurrentAsset(asset.id)
    }))
  }

  render() {
    return <Page>
      <Hero>
        <Center>
          <h1>Assets</h1>
        </Center>
      </Hero>
      <Tabs>
        <Tabs.Tab active={!this.currentPlaceable} onClick={() => this.props.switch('wearable')}>Wearables</Tabs.Tab>
        <Tabs.Tab active={this.currentPlaceable} onClick={() => this.props.switch('placeable')}>Placeables</Tabs.Tab>
      </Tabs>
      <Grid>
          {
            this.props.packs &&
            <ExpandingList width={4} list={this.getPacks()} children={this.state.currentPack
              ? <ExpandingList width={4} list={this.getCategories()} />
              : <></>
            } selectedChild={this.state.currentPack} />
          }
          {
            this.props.packs &&
            this.state.currentPack &&
            this.state.currentCategory &&
            <ExpandingList width={4} list={this.getItems()} />
          }
          {
            this.state.currentAsset &&
            <Grid.Column width={8}>
              {
                this.props.contents[this.state.currentPack][this.state.currentCategory].filter(
                  item => item.id === this.state.currentAsset
                ).map(item => <Segment key={item.id}>
                    <h4>{item.name || item.title}</h4>
                    <p>
                      <img width='100%' alt={item.name || item.title} src={item.thumbnail}/>
                    </p>
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </Segment>
                )
              }
            </Grid.Column>
          }
      </Grid>
    </Page>
  }
}

type ExpandingProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  selectedChild?: string
  list: {
    id: string
    title?: string
    name?: string
    action: Function
  }[]
}

class ExpandingList extends React.Component<ExpandingProps> {
  render() {
    return <Grid.Column width={this.props.width || 4}>
      { this.props.list.map(item => <Segment key={item.id} onClick={this.props.selectedChild
          ? this.props.selectedChild === item.id ? () => ({}) : item.action : item.action
        }>
        {item.name || item.title}
        {item.id === this.props.selectedChild ? <div style={{ paddingTop: '20px' }}>{this.props.children}</div> : <></> }
      </Segment>)}
    </Grid.Column>
  }
}
