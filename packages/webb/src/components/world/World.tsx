import React from 'react'
import ReactDOM from 'react-dom'

import { Grid, Atlas, Page, Hero, Center, Popup, Layer } from 'decentraland-ui'


export default class World extends React.Component<any, {isOpen: boolean, isHovered: boolean, popup: any, x: number, y: number} >{
  timeout: any = 0
  x = -400
  isHovered = false
  y = -400
  atlas: any = React.createRef()

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

  isHighlighted = (x: number, y: number) => this.state.x === x && this.state.y === y && this.state.isHovered

  constructor(props: any) {
    super(props)
    this.state = { isOpen: false, popup: '', x: -400, y: -400, isHovered: false }
  }

  handlePopup = (opts: any) => {
    try {
      const { x, y } = (ReactDOM.findDOMNode(this.atlas) as any).getClientRects()[0]
      this.setState({ isOpen: opts.visible, isHovered: opts.visible, popup: {
        top: opts.top + y - 50,
        left: opts.left + x - 40,
        content: <span>{`${opts.x}, ${opts.y}`}</span>
      } })
    } catch (e) {
      console.log('Warning: unclean popup state')
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  handleClick = (x: number, y: number) => {
    window.clearTimeout(this.timeout)
    this.props.gotoParcel(x, y)
  }

  render() {
    return <Page>
      <Hero>
        <Center>
        <h1>
         World
        </h1></Center>
      </Hero>
      <Popup
        content={this.state.popup.content}
        style={{ top: this.state.popup.top, left: this.state.popup.left, width: '80px', textAlign: 'center' }}
        open={this.state.isOpen}
        basic
      />
      <Grid>
        <Grid.Column width={16} style={{ minHeight: '800px' }}>
          <Atlas initialX={10} initialY={10} onClick={this.handleClick} layers={[this.hoverStrokeLayer, this.hoverFillLayer]} onHover={(x, y) => this.setState({ x, y, isHovered: true })} onPopup={this.handlePopup} ref={el => this.atlas = el}/>
        </Grid.Column>
      </Grid>
    </Page>
  }
}
