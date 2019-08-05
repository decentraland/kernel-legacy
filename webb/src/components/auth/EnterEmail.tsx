import React from 'react'

import { AuthStatusSummary } from '@dcl/webb/src/modules/auth'

import { SingleFieldSubmitForm } from './SingleFieldSubmitForm'

export function EnterEmail(props: {
  summary: AuthStatusSummary
  setEmail: (email: string) => any
}) {
  return (
    <SingleFieldSubmitForm
      title='Log in'
      loading={props.summary === 'Checking email'}
      action={props.setEmail}
    />
  )
}
