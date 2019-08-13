import * as React from 'react'
import { SystemsState } from '~/modules/systems'
import { LinkReactComponent } from '~/components/Reusable/LinkReactComponent'
import { Push } from 'connected-react-router'
import { Segment } from 'decentraland-ui'

const READY = 'Started'
const ERRORED = 'Errored'
const LOADING = 'Loading'

export class StatusNav extends React.Component<{
  current: string
  tryStart: Function
  push: Push
  systems: SystemsState
}> {
  render() {
    return (
      <Segment>
        <div className='ui secondary fluid stackable menu' style={{ flexFlow: 'row wrap' }}>
          <a
            className={'link item' + (['/', '/status'].includes(this.props.current) ? ' active' : '')}
            key='console'
            href={`/status`}
          >
            Console
          </a>
          {Object.keys(this.props.systems.status).map(state => {
            const status =
              this.props.systems.status[state] === LOADING
                ? 'yellow'
                : this.props.systems.status[state] === READY
                ? 'green'
                : this.props.systems.status[state] === ERRORED
                ? 'red'
                : 'grey'
            const url = `/status/${state}`
            return (
              <LinkReactComponent
                push={this.props.push}
                className={'ui link item' + (this.props.current === url ? ' active' : '')}
                key={state}
                href={url}
              >
                {state}
                <span className={`ui empty circular label ${status}`}></span>
              </LinkReactComponent>
            )
          })}
        </div>
      </Segment>
    )
  }
}
