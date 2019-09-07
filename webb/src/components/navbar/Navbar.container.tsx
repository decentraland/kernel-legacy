import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Navbar } from './Navbar'
import { RootState } from '~/kernel/store'

function mapState(state: RootState) {
  return {
    currentPage: state.router.location.pathname,
    isLoggingIn: false,
    isLoggedIn: false,
    profileLoaded: false,
    userId: ''
  }
}

export default connect(
  mapState,
  { login: () => push('/login'), pushLocation: (key: string) => push(key) }
)(Navbar)
