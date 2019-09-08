import { action } from 'typesafe-actions'
import { StoredProfile } from './passportTypes'

export const PASSPORT_REQUEST = '[Request] Passport fetch'
export const PASSPORT_SUCCESS = '[Success] Passport fetch'
export const PASSPORT_FAILURE = '[Failure] Passport fetch'

export const SET_PROFILE_SERVER = 'Set avatar profile server'
export const setProfileServer = (url: string) => action(SET_PROFILE_SERVER, { url })
export type SetProfileServerAction = ReturnType<typeof setProfileServer>

export const passportRequest = (userId: string) => action(PASSPORT_REQUEST, { userId })
export const passportSuccess = (userId: string, profile: StoredProfile) => action(PASSPORT_SUCCESS, { userId, profile })
export const passportFailure = (userId: string, error: any) => action(PASSPORT_FAILURE, { userId, error })

export type PassportRequestAction = ReturnType<typeof passportRequest>
export type PassportSuccessAction = ReturnType<typeof passportSuccess>
export type PassportFailureAction = ReturnType<typeof passportFailure>
