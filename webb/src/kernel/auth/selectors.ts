import { createSelector } from 'reselect'

import { AuthState } from './types'
import { AUTH_REQUEST } from './actions'

export type RootAuthState = { auth: AuthState; loading: any }

export function isTokenExpired(expiresAt: number | Date | string) {
  const value =
    typeof expiresAt === 'number'
      ? expiresAt
      : typeof expiresAt === 'string'
      ? new Date(expiresAt).getTime()
      : expiresAt.getTime
      ? expiresAt.getTime()
      : expiresAt
  return value > 0 && value < Date.now()
}

export const getState = (state: RootAuthState) => state.auth
export const getData = (state: RootAuthState) => state.auth.data
export const getLoading = (state: RootAuthState) => state.auth.loading
export const isLoggedIn = (state: RootAuthState) => getData(state) !== null
export const isLoggingIn = (state: RootAuthState) => state.loading.includes(AUTH_REQUEST)

/**
 * Accessors for the actual tokens used in requests and by the user
 */
export const getCommsToken = (state: RootAuthState) => state.auth.commsToken
export const getEphemeralKey = (state: RootAuthState) => state.auth.ephemeral
export const getAccessToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.accessToken : null)
) as (store: any) => string

/**
 * Accessors for the data stored on the Auth0 Tokens
 */
export const getIdToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.idToken : null)
) as (store: any) => string
export const isExpired = createSelector<RootAuthState, AuthState['data'], boolean>(
  getData,
  data => !!data && isTokenExpired(data.expiresAt)
) as (store: any) => boolean
export const getSub = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.sub : null)
) as (store: any) => string
