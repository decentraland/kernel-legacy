import { connect } from 'react-redux'

import { RootState } from '~/store'

import { CommsStatus } from './CommsStatus'

function mapState(state: RootState) {
  return {
    status: state.comms.summary,
    log: state.comms.log.slice(state.comms.log.length - 3)
  }
}

export default connect(mapState)(CommsStatus)
