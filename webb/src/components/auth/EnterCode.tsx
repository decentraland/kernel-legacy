import React from 'react'

import { AuthStatusSummary } from '@dcl/webb/src/modules/auth'

import { SingleFieldSubmitForm } from './SingleFieldSubmitForm'

export function EnterCode(props: {
  summary: AuthStatusSummary
  setVerificationCode: (code: string) => any
}) {
  return (
    <SingleFieldSubmitForm
      title='Log in'
      subtitle='Please enter the 4-digit code that was sent to your email'
      error={
        props.summary === 'Invalid verification code'
          ? 'It looks like that code is invalid, please try again'
          : ''
      }
      action={props.setVerificationCode}
    />
  )
}
