import { createSelector } from 'reselect'

import { isTokenExpired } from './utils'
import { AuthState } from './types'
import { AUTH_REQUEST } from './actions'

export type RootAuthState = { auth: AuthState; loading: any }

export const getState = (state: RootAuthState) => state.auth
export const getData = (state: RootAuthState) => state.auth.data
export const getLoading = (state: RootAuthState) => state.auth.loading
export const isLoggedIn = (state: RootAuthState) => getData(state) !== null
export const isLoggingIn = (state: RootAuthState) => state.loading.includes(AUTH_REQUEST)
export const getIdToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.idToken : null)
) as (store: any) => string
export const getAccessToken = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.accessToken : null)
) as (store: any) => string
export const isExpired = createSelector<RootAuthState, AuthState['data'], boolean>(
  getData,
  data => !!data && isTokenExpired(data.expiresAt)
) as (store: any) => boolean
export const getSub = createSelector<RootAuthState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.sub : null)
) as (store: any) => string

export const getCommsToken = (state: RootAuthState) => state.auth.commsToken
export const getEphemeralKey = (state: RootAuthState) => state.auth.ephemeral
