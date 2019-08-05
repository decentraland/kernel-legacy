import { connect } from 'react-redux'
import { RootState } from 'dcl/webb/src/store'

import renderAuth from './auth'
import { push } from 'connected-react-router'

export default connect(
  (state: RootState) => ({
    summary: state.auth.summary
  }),
  {
    setEmail: (email: string) => ({ type: 'Set email', payload: email }),
    setVerificationCode: (code: string) => ({
      type: 'Set verification',
      payload: code
    }),
    logout: (code: string) => ({ type: 'Logout requested' }),
    goHome: () => push('/')
  }
)(renderAuth)
