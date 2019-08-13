import * as React from 'react'
import { Segment } from 'decentraland-ui'
import { JSONTheme } from '~/components/Reusable/theme'
const JSONTree = require('react-json-tree').default

export class DefaultDataVisualizer extends React.PureComponent<{ data: any }> {
  render() {
    return (
      <>
        <Segment>
          <JSONTree data={this.props.data} theme={JSONTheme} invertTheme={false} />
        </Segment>
      </>
    )
  }
}
