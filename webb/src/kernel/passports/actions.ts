import { action } from 'typesafe-actions'
import { StoredProfile } from './types'

export const PASSPORT_REQUEST = '[Request] Passport fetch'
export const PASSPORT_SUCCESS = '[Success] Passport fetch'
export const PASSPORT_FAILURE = '[Failure] Passport fetch'

export const passportRequest = (userId: string) => action(PASSPORT_REQUEST, { userId })
export const passportSuccess = (profile: StoredProfile) => action(PASSPORT_REQUEST, { profile })
export const passportFailure = (error: any) => action(PASSPORT_REQUEST, { error })
