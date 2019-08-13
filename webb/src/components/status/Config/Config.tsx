// The rendering view
import * as React from 'react'

import * as Configuration from '@dcl/config'

import { ConfigActionProperties, ConfigStateProperties } from './Config.types'
import { DefaultDataVisualizer } from '~/components/Reusable/DefaultDataVisualizer'

export default class Config extends React.PureComponent<ConfigActionProperties & ConfigStateProperties> {
  render() {
    return (
      <>
        <DefaultDataVisualizer data={Configuration} />
      </>
    )
  }
}
