import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { StatusNav as StatusNavComponent } from './StatusNav'

export const StatusNav = connect(
  (state: any) => ({
    current: window.location.pathname,
    systems: state.systems
  }),
  dispatch => ({
    push: (url: string) => dispatch(push(url)),
    tryStart: (system: string) => dispatch({ type: 'Start System', payload: { name: system } })
  })
)(StatusNavComponent)
