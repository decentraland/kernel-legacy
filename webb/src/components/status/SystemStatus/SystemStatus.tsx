import * as React from 'react'
import { Segment, Button } from 'decentraland-ui'
import { SystemsState } from '~/modules/systems'

const READY = 'Ready to load'
const ERRORED = 'Errored'
const LOADING = 'Loading'

export default class SystemStatusComponent extends React.Component<{ tryStart: Function; systems: SystemsState }> {
  render() {
    return (
      <>
        <Segment>
          <h3>Client Systems</h3>
          <ul>
            {Object.keys(this.props.systems.status).map(state => (
              <li key={state}>
                {state}: {this.props.systems.status[state] === LOADING ? <span>Loading...</span> : <span />}
                {this.props.systems.status[state] === READY || this.props.systems.status[state] === ERRORED ? (
                  <Button
                    basic
                    compact
                    style={{ marginLeft: '10px' }}
                    positive={this.props.systems.status[state] === READY}
                    negative={this.props.systems.status[state] !== READY}
                    onClick={() => this.props.tryStart(state)}
                  >
                    {this.props.systems.status[state] === READY ? 'Start' : 'Retry'}
                  </Button>
                ) : (
                  this.props.systems.status[state]
                )}
              </li>
            ))}
          </ul>
        </Segment>
      </>
    )
  }
}
