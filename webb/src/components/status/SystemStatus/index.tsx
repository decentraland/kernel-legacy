import { connect } from 'react-redux'
import SystemStatus from './SystemStatus'

export default connect(
  (state: any) => ({
    systems: state.systems
  }),
  dispatch => ({
    tryStart: (system: string) => dispatch({ type: 'Start System', payload: { name: system } })
  })
)(SystemStatus)
