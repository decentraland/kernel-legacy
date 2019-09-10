import { ReadOnlyVector3 } from './math'
import { RaycastResponse } from './Events'
import { uuid, log } from '../ecs/helpers'

/** @internal */
import { DecentralandInterface } from './Types'

export type QueryType = 'HitFirst' | 'HitAll' | 'HitFirstAvatar' | 'HitAllAvatars'

export interface RaycastQuery {
  queryId: string
  queryType: QueryType
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
  entity: HitEntityInfo
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

export interface IPhysicsCast {
  hitFirst: (ray: Ray, hitCallback: (event: RaycastHitEntity) => void) => void
  hitAll: (ray: Ray, hitCallback: (event: RaycastHitEntities) => void) => void
  hitFirstAvatar: (ray: Ray, hitCallback: (event: RaycastHitAvatar) => void) => void
  hitAllAvatars: (ray: Ray, hitCallback: (event: RaycastHitAvatars) => void) => void
}

/** @internal */
declare let dcl: DecentralandInterface | void

export class PhysicsCast implements IPhysicsCast {
  private static _instance: PhysicsCast
  private queries: Record<string, (event: any) => void> = {}

  static get instance(): PhysicsCast {
    PhysicsCast.ensureInstance()
    return PhysicsCast._instance
  }

  static ensureInstance(): any {
    if (!PhysicsCast._instance) {
      PhysicsCast._instance = new PhysicsCast()
    }
  }

  public hitFirst(ray: Ray, hitCallback: (event: RaycastHitEntity) => void) {
    const queryId = uuid()

    this.queries[queryId] = hitCallback as (event: any) => void

    dcl && dcl.query('raycast', { queryId, queryType: 'HitFirst', ray })
  }

  public hitAll(ray: Ray, hitCallback: (event: RaycastHitEntities) => void) {
    const queryId = uuid()

    this.queries[queryId] = hitCallback as (event: any) => void

    dcl && dcl.query('raycast', { queryId, queryType: 'HitAll', ray })
  }

  public hitFirstAvatar(ray: Ray, hitCallback: (event: RaycastHitAvatar) => void) {
    log('not implemented yet')
  }

  public hitAllAvatars(ray: Ray, hitCallback: (event: RaycastHitAvatars) => void) {
    log('not implemented yet')
  }

  public handleRaycastResponse<T = RaycastHit>(response: RaycastResponse<T>) {
    log('handleRaycastResponse', response)
    if (response.payload.queryType === 'HitFirst') {
      this.queries[response.payload.queryId](response.payload.rayHit)
      delete this.queries[response.payload.queryId]
    }
  }
}
