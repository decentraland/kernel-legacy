import { StoredProfile } from './passportTypes/StoredProfile'

export type PassportState = {
  profileServer: string
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
export type RootPassportState = {
  passports: PassportState
}
export const INITIAL_PASSPORTS: PassportState = {
  profileServer: '',
  info: {}
}
