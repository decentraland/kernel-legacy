import * as React from 'react'
import { Segment, Button } from 'decentraland-ui'
import { SystemsState } from '~/modules/systems'

const READY = 'Ready to load'
const ERROR = 'Ready to load'

export default class SystemStatusComponent extends React.Component<{ tryStart: Function; systems: SystemsState }> {
  render() {
    return (
      <>
        <Segment>
          <h3>Client Systems</h3>
          <ul>
            {Object.keys(this.props.systems.status).map(state => (
              <li key={state}>
                {state}:
                {this.props.systems.status[state] === READY ? (
                  <Button
                    basic
                    compact
                    style={{ marginLeft: '10px' }}
                    positive
                    onClick={() => this.props.tryStart(state)}
                  >
                    Start
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
