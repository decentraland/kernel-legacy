import { EventConstructor } from '../ecs/EventManager'
import { RaycastHit } from './PhysicsCast'

/**
 * @public
 */
@EventConstructor()
export class UUIDEvent<T = any> {
  constructor(public readonly uuid: string, public readonly payload: T) {}
}

@EventConstructor()
export class RaycastResponse {
  constructor(
    public readonly payload: {
      queryId: string
      queryType: string
      rayHit: RaycastHit
    }
  ) {}
}

/**
 * @public
 */
@EventConstructor()
export class PointerEvent<GlobalInputEventResult> {
  constructor(public readonly payload: GlobalInputEventResult) {}
}
