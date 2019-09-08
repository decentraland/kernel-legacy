import * as React from 'react'
import { Push } from 'connected-react-router'

export default class SystemNavComponent extends React.Component<{
  current: string
  tryStart: Function
  push: Push
}> {
  render() {
    return (
      <div className="ui secondary fluid stackable menu" style={{ flexFlow: 'row wrap' }}>
        <a
          className={'link item' + (['/', '/status'].includes(this.props.current) ? ' active' : '')}
          key="console"
          href={`/status`}
        >
          Console
        </a>
      </div>
    )
  }
}
