export type AuthInfo = {
  email: string
  verificationCode: string
  sub: string
  idToken: string
  accessToken: string
  expiresAt: number
}

export type AuthState = {
  isAuthenticated: boolean
  userWentBack: boolean
  loading?: boolean
  error?: string
} & Partial<AuthInfo>
