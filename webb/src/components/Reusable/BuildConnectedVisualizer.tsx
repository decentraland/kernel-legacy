// The presenter
import { connect } from 'react-redux'

import { DefaultDataVisualizer } from './DefaultDataVisualizer'
import { client } from '~/modules/systems'

export function BuildConnectedVisualizer(key: string) {
  return connect((_: any) => ({ data: client[key] }))(DefaultDataVisualizer)
}
