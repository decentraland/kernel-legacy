import { connect } from 'react-redux'
import { RootState } from 'store';
import { push } from 'connected-react-router';
import { Navbar } from './Navbar';

function mapState(state: RootState) {
  const isLoggedIn = state.auth.summary === 'Logged in'
  return {
    currentPage: state.router.location.pathname,
    isLoggedIn,
    profileLoaded: false,
    userId: isLoggedIn ? state.auth.sub : ''
  }
}

export default connect(mapState, { login: () => push('/login') })(Navbar)
