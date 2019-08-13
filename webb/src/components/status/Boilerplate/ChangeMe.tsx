// The rendering view
import * as React from 'react'
import { ChangeMeActionProperties, ChangeMeStateProperties } from './ChangeMe.types'

export default class ChangeMe extends React.PureComponent<ChangeMeActionProperties & ChangeMeStateProperties> {
  render() {
    return (
      <>
        <div onClick={() => this.props.dummy()}>{this.props.myProp}</div>
      </>
    )
  }
}
