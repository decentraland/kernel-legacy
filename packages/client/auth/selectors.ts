import { createSelector } from 'reselect'

import { isTokenExpired } from './lib'
import { createHeaders } from './api'
import { AuthState } from './types'

export const isAuthenticated = (state: AuthState) => state.isAuthenticated
export const hasFetchedProfile = (state: AuthState) => state.hasFetchedProfile
export const hasAttemptedAuth = (state: AuthState) => state.hasAttemptedAuth
export const getIdToken = (state: AuthState) => state.idToken
export const getAccessToken = (state: AuthState) => state.accessToken
export const isExpired = (state: AuthState) => isTokenExpired(state.expiresAt)
export const getEmail = (state: AuthState) => state.email
export const getSub = (state: AuthState) => state.sub

export const getHeaders = createSelector<AuthState, string, Record<string, string>>(
  getIdToken,
  idToken => createHeaders(idToken)
)