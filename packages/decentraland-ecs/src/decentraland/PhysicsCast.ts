import { ReadOnlyVector3 } from './math'

interface RaycastQuery {
  ray: Ray
}

interface RaycastHit {
  didHit: boolean
  ray: Ray
  hitPoint: ReadOnlyVector3
  hitNormal: ReadOnlyVector3
}

interface Ray {
  origin: ReadOnlyVector3
  direction: ReadOnlyVector3
  distance: number
}

interface HitEntityInfo {
  entityId: string
  meshName: string
}

interface RaycastHitEntities extends RaycastHit {
  entities: HitEntityInfo[]
}

interface RaycastHitEntity extends RaycastHit {
  entities: HitEntityInfo
}

interface BasicAvatarInfo {
  userId: string
  name: string
}

interface RaycastHitAvatar extends RaycastHit {
  avatar: BasicAvatarInfo
}

interface RaycastHitAvatars extends RaycastHit {
  avatars: BasicAvatarInfo[]
}

export interface PhysicsCast {
  hitFirst: (query: RaycastQuery, hitCallback: (event: RaycastHitEntity) => void) => void
  hitAll: (query: RaycastQuery, hitCallback: (event: RaycastHitEntities) => void) => void
  hitFirstAvatar: (query: RaycastQuery, hitCallback: (event: RaycastHitAvatar) => void) => void
  hitAllAvatars: (query: RaycastQuery, hitCallback: (event: RaycastHitAvatars) => void) => void
}
