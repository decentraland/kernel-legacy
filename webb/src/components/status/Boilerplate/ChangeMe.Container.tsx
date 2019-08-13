// The presenter
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { RootState } from '~/store'

import { default as ChangeMe } from './ChangeMe'
import { ChangeMeStateProperties, ChangeMeActionProperties } from './ChangeMe.types'

/**
 * Map properties from the global state of redux to the view
 * @param state the global redux state
 */
function mapState(/* Global Redux State */ _: RootState, /* "OwnProperties" */ __: any): ChangeMeStateProperties {
  return {
    myProp: 'dummy'
  }
}

/**
 * Map actions to the view component
 * @param state the global redux state
 */
function mapDispatchToProps(dispatch: Dispatch): ChangeMeActionProperties {
  return {
    dummy: () => dispatch({ type: 'Dummy' })
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(ChangeMe)
