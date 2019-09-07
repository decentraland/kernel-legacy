import * as React from 'react'
import { LinkReactComponent } from '~/components/Reusable/LinkReactComponent'
import { Push } from 'connected-react-router'

const READY = 'Started'
const ERRORED = 'Errored'
const LOADING = 'Loading'

export default class SystemNavComponent extends React.Component<{
  current: string
  tryStart: Function
  push: Push
  systems: SystemsState
}> {
  render() {
    return (
      <div className='ui secondary fluid stackable menu' style={{ flexFlow: 'row wrap' }}>
        <a
          className={'link item' + (['/', '/status'].includes(this.props.current) ? ' active' : '')}
          key='console'
          href={`/status`}
        >
          Console
        </a>
      </div>
    )
  }
}
