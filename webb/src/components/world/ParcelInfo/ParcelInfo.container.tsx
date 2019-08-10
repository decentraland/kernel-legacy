import { connect } from 'react-redux'

import { default as ParcelInfo } from './ParcelInfo'
import { RootState } from 'store'
import { push } from 'connected-react-router'

function mapState(state: RootState, ownProps: any) {
  const location = ownProps.location.pathname
  const [x, y] = location.split('/')[2].split('.').map((x: string) => parseInt(x, 10))
  return {
    ...state.world,
    parcel: { x, y }
  }
}

export default connect(mapState, {
  goto: push
})(ParcelInfo)
