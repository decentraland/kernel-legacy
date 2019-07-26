import { connect } from 'react-redux'

import { RootState } from 'store'
import { push } from 'connected-react-router'
import * as locations from '../../locations'
import World from './World'

function mapState(state: RootState) {
  return state.world
}

export default connect(mapState, {
  onClick: (x: number, y: number) => ({ type: 'Set selected world parcel', payload: { x, y } }),
  gotoParcel: (x: number, y: number) => push(locations.parcel(x, y))
})(World)
