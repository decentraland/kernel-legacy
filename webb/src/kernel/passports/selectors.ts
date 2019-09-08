import { RootPassportState } from './types'

export const getProfileDownloadServer = (store: RootPassportState) => store.passports.profileServer
