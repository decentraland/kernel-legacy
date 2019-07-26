import React from 'react'
import { Header, HeaderMenu, Segment } from 'decentraland-ui'

export function NoDeployment() {
  return <Segment>
    <HeaderMenu>
      <HeaderMenu.Left>
        <Header>No deployment found for this parcel</Header>
      </HeaderMenu.Left>
    </HeaderMenu>
  </Segment>
}
