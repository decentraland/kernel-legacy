export type Catalog = Wearable[]

export type Profile = {
  userId: string
  name: string
  description: string
  email: string
  avatar: Avatar
  inventory: WearableId[]
  snapshots: {
    face: string
    body: string
  }
  version: number
  updated_at: number
  created_at: number
}

export type Avatar = {
  bodyShape: WearableId
  skinColor: ColorString
  hairColor: ColorString
  eyeColor: ColorString
  wearables: WearableId[]
}

export type Wearable = {
  id: WearableId
  type: 'wearable'
  category: string
  baseUrl: string
  tags: string[]
  representations: BodyShapeRespresentation[]
}

export type BodyShapeRespresentation = {
  bodyShapes: string[]
  mainFile: string
  contents: FileAndHash[]
}

export type FileAndHash = {
  file: string
  hash: string
}

export type WearableId = string

export type ColorString = string

export type PassportState = {
  profileServer: string
  userInfo: {
    [key: string]: { status: 'loading' | 'error'; data: any } | { status: 'ok'; data: Profile }
  }
  userInventory: {
    [key: string]: { status: 'loading' } | { status: 'error'; data: any } | { status: 'ok'; data: WearableId[] }
  }
  catalogs: {
    [key: string]: { id: string; status: 'loading' | 'error' | 'ok'; data?: Wearable[]; error?: any }
  }
}

export type RootPassportState = {
  passports: PassportState
}
export const INITIAL_PASSPORTS: PassportState = {
  profileServer: '',
  userInfo: {},
  userInventory: {},
  catalogs: {}
}
