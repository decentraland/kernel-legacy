export const RENDERING_ACTIVATED = 'Rendering activated'

export type _V1_Profile = {
  userId: string
  name: string
  email: string
  description: string
  created_at: number
  updated_at: number
  version: string
  avatar: _V1_Avatar
}

export type _V1_Wearable = {
  category: string
  contentName: string
  contents: { file: string; hash: string }[]
}

export type _V1_Color4 = {
  r: number
  g: number
  b: number
  a: number
}

export type _V1_Avatar = {
  baseUrl: string
  wearables: _V1_Wearable[]
  bodyShape: _V1_Wearable
  skin: { color: _V1_Color4 }
  hair: { color: _V1_Color4 }
  eyes: {
    texture: string
    mask?: string
    color?: _V1_Color4
  }
  eyebrows: {
    texture: string
  }
  mouth: {
    texture: string
  }
  snapshots: {
    body: string
    face: string
  }
}
