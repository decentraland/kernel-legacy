import { RootPassportState } from './types'
import { RootAuthState } from '../auth/types'
import { getMyCurrentUserId } from '../auth/selectors'
import { StoredProfile } from './passportTypes'

export const getProfileDownloadServer = (store: RootPassportState) => store.passports.profileServer

export const getProfile = (store: RootPassportState, userId: string) =>
  store.passports.info[userId].status === 'ok' ? (store.passports.info[userId].data as StoredProfile) : null

export const getMyCurrentProfileVersion = (store: RootPassportState & RootAuthState) => {
  const userId = getMyCurrentUserId(store)
  const profile = getProfile(store, userId)
  return profile === null ? null : profile.version
}
