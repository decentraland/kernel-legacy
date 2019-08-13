// The presenter
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { RootState } from '~/store'

import { default as Config } from './Config'
import { ConfigStateProperties, ConfigActionProperties } from './Config.types'

/**
 * Map properties from the global state of redux to the view
 * @param state the global redux state
 */
function mapState(/* Global Redux State */ _: RootState, /* "OwnProperties" */ __: any): ConfigStateProperties {
  return {
    data: 1
  }
}

/**
 * Map actions to the view component
 * @param state the global redux state
 */
function mapDispatchToProps(dispatch: Dispatch): ConfigActionProperties {
  return {}
}

export default connect(
  mapState,
  mapDispatchToProps
)(Config)
