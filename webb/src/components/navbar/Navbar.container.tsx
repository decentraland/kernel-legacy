import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Navbar } from './Navbar'
import { RootState } from '@dcl/webb/src/store'

function mapState(state: RootState) {
  const isLoggedIn = state.auth.summary === 'Logged in'
  return {
    currentPage: state.router.location.pathname,
    isLoggingIn: state.auth.summary !== 'Not logged in',
    isLoggedIn,
    profileLoaded: false,
    userId: isLoggedIn ? state.auth.sub : ''
  }
}

export default connect(
  mapState,
  { login: () => push('/login'), pushLocation: (key: string) => push(key) }
)(Navbar)
