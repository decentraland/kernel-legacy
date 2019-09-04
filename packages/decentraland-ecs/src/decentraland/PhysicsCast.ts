import { ReadOnlyVector3 } from './math'

export interface RaycastQuery {
  queryId: string
  queryType: 'HitFirst' | 'HitAll' | 'HitFirstAvatar' | 'HitAllAvatars'
  ray: Ray
}

export interface RaycastHit {
  didHit: boolean
  ray: Ray
  hitPoint: ReadOnlyVector3
  hitNormal: ReadOnlyVector3
}

export interface Ray {
  origin: ReadOnlyVector3
  direction: ReadOnlyVector3
  distance: number
}

export interface HitEntityInfo {
  entityId: string
  meshName: string
}

export interface RaycastHitEntities extends RaycastHit {
  entities: HitEntityInfo[]
}

export interface RaycastHitEntity extends RaycastHit {
  entities: HitEntityInfo
}

export interface BasicAvatarInfo {
  userId: string
  name: string
}

export interface RaycastHitAvatar extends RaycastHit {
  avatar: BasicAvatarInfo
}

export interface RaycastHitAvatars extends RaycastHit {
  avatars: BasicAvatarInfo[]
}

export interface PhysicsCast {
  hitFirst: (query: RaycastQuery, hitCallback: (event: RaycastHitEntity) => void) => void
  hitAll: (query: RaycastQuery, hitCallback: (event: RaycastHitEntities) => void) => void
  hitFirstAvatar: (query: RaycastQuery, hitCallback: (event: RaycastHitAvatar) => void) => void
  hitAllAvatars: (query: RaycastQuery, hitCallback: (event: RaycastHitAvatars) => void) => void
}
