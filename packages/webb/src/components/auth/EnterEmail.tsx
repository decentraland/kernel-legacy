import React from 'react'
import { AuthStatusSummary } from 'modules/auth'
import { SingleFieldSubmitForm } from './SingleFieldSubmitForm'

export function EnterEmail(props: { summary: AuthStatusSummary; setEmail: (email: string) => any }) {
  return (
    <SingleFieldSubmitForm
      title="Log in"
      subtitle={
        props.summary === 'Expired credentials'
          ? 'Welcome back! We need to verify your identity:'
          : props.summary === 'Logged out'
          ? 'You have succesfully logged out.'
          : ''
      }
      loading={props.summary === 'Checking email'}
      action={props.setEmail}
    />
  )
}
