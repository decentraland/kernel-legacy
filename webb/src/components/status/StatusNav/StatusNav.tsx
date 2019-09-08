import * as React from 'react'
import { LinkReactComponent } from '~/components/Reusable/LinkReactComponent'
import { Push } from 'connected-react-router'
import { Segment } from '~/components/liteui/dcl'

export class StatusNav extends React.Component<{
  current: string
  tryStart: Function
  push: Push
}> {
  render() {
    return (
      <Segment>
        <div className="ui secondary fluid stackable menu" style={{ flexFlow: 'row wrap' }}>
          <LinkReactComponent
            push={this.props.push}
            className={'link item' + (['/', '/status'].includes(this.props.current) ? ' active' : '')}
            key="console"
            href={`/status`}
          >
            Console
          </LinkReactComponent>
        </div>
      </Segment>
    )
  }
}
