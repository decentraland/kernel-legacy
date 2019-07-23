import React from 'react'

import { Segment } from 'decentraland-ui'

export type CommsStatusProps = {
  status: string,
  log: string[]
}

export class CommsStatus extends React.Component<CommsStatusProps> {
  render() {
    return <Segment>
      <h3>Communications</h3>
      <h4>Status: { this.props.status }</h4>
      {
        (this.props.status !== 'Connected!' && this.props.log.length && <>
          <h4>Last log messages:</h4> <ul>
            { this.props.log.map((logEntry, key) => <li key={key}>{logEntry}</li>)}
          </ul>
        </>) || ''
      }
    </Segment>
  }
}
