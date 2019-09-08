import * as React from 'react'
import { JSONTheme } from '~/components/Reusable/theme'
import { Segment } from '../liteui/dcl'
const JSONTree = require('react-json-tree').default

export class DefaultDataVisualizer extends React.PureComponent<{ data: any; shouldExpandNode?: any }> {
  render() {
    return (
      <>
        <Segment>
          <JSONTree
            data={this.props.data}
            theme={JSONTheme}
            shouldExpandNode={this.props.shouldExpandNode}
            hideRoot={true}
            invertTheme={false}
          />
        </Segment>
      </>
    )
  }
}
