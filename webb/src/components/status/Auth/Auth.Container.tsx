// The presenter
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { RootState } from '~/store'

import { default as Auth } from './Auth'
import { AuthStateProperties, AuthActionProperties } from './Auth.types'
import { client } from '~/modules/systems'

/**
 * Map properties from the global state of redux to the view
 * @param state the global redux state
 */
function mapState(/* Global Redux State */ _: RootState, /* "OwnProperties" */ __: any): AuthStateProperties {
  debugger
  return {
    myProp: client
  }
}

/**
 * Map actions to the view component
 * @param state the global redux state
 */
function mapDispatchToProps(dispatch: Dispatch): AuthActionProperties {
  return {
    dummy: () => dispatch({ type: 'Dummy' })
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Auth)
