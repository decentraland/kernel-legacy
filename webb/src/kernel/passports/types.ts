import { StoredProfile } from './types/StoredProfile'

export type PassportState = {
  info: {
    [key: string]:
      | {
          status: 'loading' | 'error'
          data: any
        }
      | {
          status: 'ok'
          data: StoredProfile
        }
  }
}
export type PassportRootState = {
  passports: PassportState
}
export const INITIAL_PASSPORTS: PassportState = {
  info: {}
}
