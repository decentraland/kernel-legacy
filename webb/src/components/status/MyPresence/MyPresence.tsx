// The rendering view
import * as React from 'react'
import { MyPresenceActionProperties, MyPresenceStateProperties } from './MyPresence.types'

export default class MyPresence extends React.PureComponent<MyPresenceActionProperties & MyPresenceStateProperties> {
  render() {
    const { lastPlayerPosition, lastPlayerPositionReport, lastTimeUpdatedUrl } = this.props
    return (
      <>
        <pre>
          {JSON.stringify(
            {
              lastPlayerPosition,
              lastPlayerPositionReport,
              lastTimeUpdatedUrl
            },
            null,
            2
          )}
        </pre>
      </>
    )
  }
}
