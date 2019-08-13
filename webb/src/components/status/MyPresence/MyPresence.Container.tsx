// The presenter
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { RootState } from '~/store'

import { default as MyPresence } from './MyPresence'
import { MyPresenceStateProperties, MyPresenceActionProperties } from './MyPresence.types'

import { client } from '~/modules/systems'

/**
 * Map properties from the global state of redux to the view
 * @param state the global redux state
 */
function mapState(/* Global Redux State */ _: RootState, /* "OwnProperties" */ __: any): MyPresenceStateProperties {
  const MyPresenceSystem = client.MyPresence
  if (!MyPresenceSystem) {
    return {
      lastPlayerPosition: 0,
      lastTimeUpdatedUrl: 0,
      lastPlayerPositionReport: 0
    }
  }
  const { lastPlayerPositionReport, lastPlayerPosition, lastTimeUpdatedUrl } = MyPresenceSystem.myPresenceTracker
  return {
    lastPlayerPosition,
    lastTimeUpdatedUrl,
    lastPlayerPositionReport
  }
}

/**
 * Map actions to the view component
 * @param state the global redux state
 */
function mapDispatchToProps(dispatch: Dispatch): MyPresenceActionProperties {
  return {}
}

export default connect(
  mapState,
  mapDispatchToProps
)(MyPresence)
