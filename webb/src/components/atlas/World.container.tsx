import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { RootState } from '~/store'
import * as locations from '~/locations'
import World from './World'

function mapState(state: RootState) {
  return state.world
}

export default connect(
  mapState,
  {
    thing: () => ({}),
    onClick: (x: number, y: number) => ({
      type: 'Set selected world parcel',
      payload: { x, y }
    }),
    gotoParcel: (x: number, y: number) => push(locations.parcel(x, y))
  }
)(World)
