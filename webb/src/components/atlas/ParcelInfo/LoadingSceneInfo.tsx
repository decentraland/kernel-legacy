import React from 'react'

import { Header, HeaderMenu, Segment } from 'decentraland-ui'

export function LoadingSceneInfo() {
  return <Segment>
    <HeaderMenu>
      <HeaderMenu.Left>
        <Header>Loading scene info</Header>
      </HeaderMenu.Left>
    </HeaderMenu>
  </Segment>
}
