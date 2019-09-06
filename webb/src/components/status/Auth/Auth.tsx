// The rendering view
import * as React from 'react'
import { AuthActionProperties, AuthStateProperties } from './Auth.types'
import { DefaultDataVisualizer } from '~/components/Reusable/DefaultDataVisualizer'

export default class Auth extends React.PureComponent<AuthActionProperties & AuthStateProperties> {
  render() {
    return (
      <>
        <DefaultDataVisualizer data={this.props.myProp} />
      </>
    )
  }
}
