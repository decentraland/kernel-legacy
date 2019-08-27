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
export class PointerDownEvent<LocalPointerEvent> {
  constructor(public readonly payload: LocalPointerEvent) {}
}

/**
 * @public
 */
@EventConstructor()
export class PointerUpEvent<LocalPointerEvent> {
  constructor(public readonly payload: LocalPointerEvent) {}
}
