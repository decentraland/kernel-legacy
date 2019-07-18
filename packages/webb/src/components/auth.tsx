import React from 'react'

import { Segment } from 'decentraland-ui'
import { AuthState } from 'modules/auth'

export default function renderAuth(state: AuthState) {
  switch (state.summary) {
    case 'Not logged in':
      return (
        <Segment>
          <h1>Log in</h1>
        </Segment>
      )
  }
}
