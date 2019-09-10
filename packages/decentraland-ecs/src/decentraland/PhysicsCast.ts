import { ReadOnlyVector3 } from './math'
import { RaycastResponse } from './Events'
import { uuid, log } from '../ecs/helpers'

/** @internal */
import { DecentralandInterface } from './Types'

/**
 * @internal
 */
export type QueryType = 'HitFirst' | 'HitAll' | 'HitFirstAvatar' | 'HitAllAvatars'

/**
 * @internal
 */
export interface RaycastQuery {
  queryId: string
  queryType: QueryType
  ray: Ray
}

/**
 * @public
 */
export interface RaycastHit {
  didHit: boolean
  ray: Ray
  hitPoint: ReadOnlyVector3
  hitNormal: ReadOnlyVector3
}

/**
 * @public
 */
export interface Ray {
  origin: ReadOnlyVector3
  direction: ReadOnlyVector3
  distance: number
}

/**
 * @public
 */
export interface HitEntityInfo {
  isValid: boolean
  entityId: string
  meshName: string
}

/**
 * @public
 */
export interface RaycastHitEntities extends RaycastHit {
  entities: HitEntityInfo[]
}

/**
 * @public
 */
export interface RaycastHitEntity extends RaycastHit {
  entity: HitEntityInfo
}

/**
 * @public
 */
export interface BasicAvatarInfo {
  userId: string
  name: string
}

/**
 * @public
 */
export interface RaycastHitAvatar extends RaycastHit {
  avatar: BasicAvatarInfo
}

/**
 * @public
 */
export interface RaycastHitAvatars extends RaycastHit {
  avatars: BasicAvatarInfo[]
}

/**
 * @public
 */
export interface IPhysicsCast {
  hitFirst: (ray: Ray, hitCallback: (event: RaycastHitEntity) => void) => void
  hitAll: (ray: Ray, hitCallback: (event: RaycastHitEntities) => void) => void
  hitFirstAvatar: (ray: Ray, hitCallback: (event: RaycastHitAvatar) => void) => void
  hitAllAvatars: (ray: Ray, hitCallback: (event: RaycastHitAvatars) => void) => void
}

/** @internal */
declare let dcl: DecentralandInterface | void

/**
 * @public
 */
export class PhysicsCast implements IPhysicsCast {
  private static _instance: PhysicsCast
  private queries: Record<string, (event: RaycastHit) => void> = {}

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

    this.queries[queryId] = hitCallback as (event: RaycastHit) => void

    dcl && dcl.query('raycast', { queryId, queryType: 'HitFirst', ray })
  }

  public hitAll(ray: Ray, hitCallback: (event: RaycastHitEntities) => void) {
    const queryId = uuid()

    this.queries[queryId] = hitCallback as (event: RaycastHit) => void

    dcl && dcl.query('raycast', { queryId, queryType: 'HitAll', ray })
  }

  public hitFirstAvatar(ray: Ray, hitCallback: (event: RaycastHitAvatar) => void) {
    log('not implemented yet')
  }

  public hitAllAvatars(ray: Ray, hitCallback: (event: RaycastHitAvatars) => void) {
    log('not implemented yet')
  }

  public handleRaycastHitFirstResponse(response: RaycastResponse<RaycastHitEntity>) {
    log('handleRaycastResponse', response.payload.payload)
    this.queries[response.payload.queryId](response.payload.payload)
    delete this.queries[response.payload.queryId]
  }

  public handleRaycastHitAllResponse(response: RaycastResponse<RaycastHitEntities>) {
    log('handleRaycastResponse', response)
    this.queries[response.payload.queryId](response.payload.payload)
    delete this.queries[response.payload.queryId]
  }
}
