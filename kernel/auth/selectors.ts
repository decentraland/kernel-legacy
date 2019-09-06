import { createSelector } from 'reselect'

import { isTokenExpired } from './utils'
import { AuthState } from './types'
import { AUTH_REQUEST } from './actions'

type RootState = any

export const getState = (state: RootState) => state.auth
export const getData = (state: RootState) => state.auth.data
export const getLoading = (state: RootState) => state.auth.loading
export const isLoggedIn = (state: RootState) => getData(state) !== null
export const isLoggingIn = (state: RootState) => state.loading.includes(AUTH_REQUEST)
export const getIdToken = createSelector<RootState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.idToken : null)
)
export const getAccessToken = createSelector<RootState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.accessToken : null)
)
export const isExpired = createSelector<RootState, AuthState['data'], boolean>(
  getData,
  data => !!data && isTokenExpired(data.expiresAt)
)
export const getSub = createSelector<RootState, AuthState['data'], string | null>(
  getData,
  data => (data ? data.sub : null)
)
