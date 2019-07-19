import React from 'react'

import { Segment, Button } from 'decentraland-ui'

import { AuthStatusSummary } from 'modules/auth'
import { EnterCode } from './EnterCode'
import { EnterEmail } from './EnterEmail'

export default function renderAuth(props: {
  summary: AuthStatusSummary
  setEmail: (email: string) => any
  setVerificationCode: (code: string) => any
  back: () => any
  logout: any
}): JSX.Element {
  switch (props.summary) {
    case 'Not initialized':
    case 'Loading...':
      return <Segment>Loading...</Segment>

    case 'Not logged in':
    case 'Logged out':
    case 'User went back':
    case 'Expired credentials':
    case 'Checking email':
      return <EnterEmail {...props} />

    case 'Checking verification code':
    case 'Awaiting verification':
    case 'Invalid verification code':
      return <EnterCode {...props} />

    case 'No access to Beta':
      return <Segment>Please ask for access to the whitelist</Segment>

    case 'Logged in':
      return <Segment><h2>Connected!</h2><Button onClick={props.logout}>Logout</Button></Segment>
  }
}
