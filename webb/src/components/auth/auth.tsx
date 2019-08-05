import React from 'react'

import { Segment, Page, Center } from 'decentraland-ui'

import { AuthStatusSummary } from '@dcl/webb/src/modules/auth'
import { EnterCode } from './EnterCode'
import { EnterEmail } from './EnterEmail'

export function wrap(element: any) {
  return (
    <>
      <Page>
        <Center>{element}</Center>
      </Page>
    </>
  )
}

export default function renderAuth(props: {
  summary: AuthStatusSummary
  setEmail: (email: string) => any
  setVerificationCode: (code: string) => any
  goHome: () => any
  logout: any
}): JSX.Element {
  switch (props.summary) {
    case 'Not initialized':
    case 'Loading...':
      return wrap(<Segment>Loading...</Segment>)

    case 'Not logged in':
    case 'Logged out':
    case 'Checking email':
      return <EnterEmail {...props} />

    case 'Checking verification code':
    case 'Awaiting verification':
    case 'Invalid verification code':
      return <EnterCode {...props} />

    case 'No access to Beta':
      return wrap(<Segment>Please ask for access to the whitelist</Segment>)

    case 'Logged in':
      return wrap(
        <Segment>
          <div style={{ textAlign: 'center' }}>
            <h2>Connected!</h2>
            <h4>Redirecting you to the home screen...</h4>
          </div>
        </Segment>
      )
  }
}
