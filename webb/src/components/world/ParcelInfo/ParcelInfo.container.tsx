import { connect } from 'react-redux'

import { RootState } from 'dcl/webb/src/store'
import { push } from 'connected-react-router'

import { default as ParcelInfo } from './ParcelInfo'

function mapState(state: RootState, ownProps: any) {
  const location = ownProps.location.pathname
  const [x, y] = location
    .split('/')[2]
    .split('.')
    .map((x: string) => parseInt(x, 10))
  return {
    parcel: { x, y },
    parcelData: {},
    ...state.world
  }
}

export default connect(
  mapState,
  {
    goto: push
  }
)(ParcelInfo)
