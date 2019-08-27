import { EventConstructor } from '../ecs/EventManager'

/**
 * @public
 */
@EventConstructor()
export class UUIDEvent<T = any> {
  constructor(public readonly uuid: string, public readonly payload: T) {}
}

/**
 * @public
 */
@EventConstructor()
export class PointerDownEvent<PointerEvent> {
  constructor(public readonly payload: PointerEvent) {}
}

/**
 * @public
 */
@EventConstructor()
export class PointerUpEvent<PointerEvent> {
  constructor(public readonly payload: PointerEvent) {}
}
