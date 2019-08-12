import { connect } from 'react-redux'

import { Assets } from './Assets'
import { RootState } from '~/store'

function mapState(state: RootState) {
  return state.assets
}

export default connect(
  mapState,
  { switch: (tab: any) => ({ type: 'Switch tab', payload: tab }) }
)(Assets)
