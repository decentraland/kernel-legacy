// tslint:disable:ter-indent
// tslint:disable:ter-indent

import { GlobalInputEventResult, InputEventType } from './Types'
import { Vector3 } from './math'
import { Component, DisposableComponent } from '../ecs/Component'

/** @public */
export type InputEventKind = 'BUTTON_DOWN' | 'BUTTON_UP'

/**
 * @public
 */
export enum ActionButton {
  POINTER = 'POINTER',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY'
}

/** @public */
export type InputState = Record<
  ActionButton,
  {
    BUTTON_DOWN: boolean
  }
>

/** @public */
export type LocalPointerEvent = GlobalInputEventResult & {
  origin: Vector3
  direction: Vector3
  pointer: ActionButton
  hit?: GlobalInputEventResult['hit'] & {
    hitPoint: Vector3
    normal: Vector3
    worldNormal: Vector3
  }
}

/**
 * @public
 */
export class PointerEventComponent {
  constructor(public readonly callback: (event: LocalPointerEvent) => void) {
    if (!callback || !('apply' in callback) || !('call' in callback)) {
      throw new Error('Callback is not a function')
    }
    // tslint:disable-next-line:no-use-before-declare
    Input.ensureInstance()
  }
}

/**
 * @public
 */
@Component('pointerDown')
export class GlobalPointerDown extends PointerEventComponent {}

/**
 * @public
 */
@Component('pointerUp')
export class GlobalPointerUp extends PointerEventComponent {}

export class Subscription {
  public fn: (e: LocalPointerEvent) => void
  public useRaycast: boolean

  constructor(fn: (e: LocalPointerEvent) => void, useRaycast: boolean) {
    this.fn = fn
    this.useRaycast = useRaycast
  }
}

/**
 * @public
 */
export class Input {
  private static _instance: Input

  static get instance(): Input {
    Input.ensureInstance()
    return Input._instance
  }

  public get state(): Readonly<InputState> {
    return this.internalState
  }

  private subscriptions: Record<ActionButton, Record<InputEventKind, Array<Subscription>>> = {
    [ActionButton.POINTER]: {
      BUTTON_DOWN: [],
      BUTTON_UP: []
    },
    [ActionButton.PRIMARY]: {
      BUTTON_DOWN: [],
      BUTTON_UP: []
    },
    [ActionButton.SECONDARY]: {
      BUTTON_DOWN: [],
      BUTTON_UP: []
    }
  }

  private internalState: InputState = {
    [ActionButton.POINTER]: {
      BUTTON_DOWN: false
    },
    [ActionButton.PRIMARY]: {
      BUTTON_DOWN: false
    },
    [ActionButton.SECONDARY]: {
      BUTTON_DOWN: false
    }
  }

  private constructor() {}

  static ensureInstance(): any {
    if (!Input._instance) {
      Input._instance = new Input()
    }
  }

  /**
   * Subscribes to an input event and triggers the provided callback.
   *
   * Returns a function that can be called to remove the subscription.
   * @param eventName - The name of the event (see InputEventKind).
   * @param pointerId - The id of the button.
   * @param useRaycast - Enables getting raycast information.
   * @param fn - A callback function to be called when the event is triggered.
   */
  public subscribe(
    eventName: InputEventKind,
    pointerId: ActionButton,
    useRaycast: boolean,
    fn: (e: LocalPointerEvent) => void
  ) {
    this.subscriptions[pointerId][eventName].push(new Subscription(fn, useRaycast))
    return () => this.unsubscribe(eventName, pointerId, fn)
  }

  /**
   * Removes an existing input event subscription.
   * @param eventName - The name of the event (see InputEventKind).
   * @param pointerId - The id of the button.
   * @param fn - The callback function used when subscribing to the event.
   */
  public unsubscribe(eventName: InputEventKind, pointerId: ActionButton, fn: (e: LocalPointerEvent) => void) {
    const index = this.getSubscriptionId(eventName, pointerId, fn)
    if (index > -1) {
      return this.subscriptions[pointerId][eventName].splice(index, 1)
    }
    return false
  }

  public handlePointerEvent(data: GlobalInputEventResult) {
    const pointer = this.getPointerById(data.pointerId)

    let eventResult: LocalPointerEvent = {
      ...data,
      pointer,
      direction: new Vector3().copyFrom(data.direction),
      origin: new Vector3().copyFrom(data.origin),
      hit: undefined
    }

    const hit = data.hit
      ? {
          ...data.hit,
          hitPoint: new Vector3().copyFrom(data.hit.hitPoint),
          normal: new Vector3().copyFrom(data.hit.normal),
          worldNormal: new Vector3().copyFrom(data.hit.worldNormal)
        }
      : undefined

    if (data.type === InputEventType.DOWN) {
      this.internalState[pointer].BUTTON_DOWN = true

      for (let i = 0; i < this.subscriptions[pointer]['BUTTON_DOWN'].length; i++) {
        let subscription = this.subscriptions[pointer]['BUTTON_DOWN'][i]

        // remove hit information when raycast is disabled
        if (subscription.useRaycast) {
          eventResult.hit = hit
        } else {
          eventResult.hit = undefined
        }

        subscription.fn(eventResult)
      }

      if (hit && hit.entityId && DisposableComponent.engine) {
        const entity = DisposableComponent.engine.entities[hit.entityId]
        const handler = entity && entity.getComponentOrNull(GlobalPointerDown)
        if (handler) {
          eventResult.hit = hit
          handler.callback(eventResult)
        }
      }
    } else {
      this.internalState[pointer].BUTTON_DOWN = false

      for (let i = 0; i < this.subscriptions[pointer]['BUTTON_UP'].length; i++) {
        let subscription = this.subscriptions[pointer]['BUTTON_UP'][i]

        // remove hit information when raycast is disabled
        if (subscription.useRaycast) {
          eventResult.hit = hit
        } else {
          eventResult.hit = undefined
        }

        subscription.fn(eventResult)
      }

      if (hit && hit.entityId && DisposableComponent.engine) {
        const entity = DisposableComponent.engine.entities[hit.entityId]
        const handler = entity && entity.getComponentOrNull(GlobalPointerUp)
        if (handler) {
          eventResult.hit = hit
          handler.callback(eventResult)
        }
      }
    }
  }

  private getSubscriptionId(
    eventName: InputEventKind,
    pointerId: ActionButton,
    fn: (e: LocalPointerEvent) => void
  ): number {
    for (let i = 0; i < this.subscriptions[pointerId][eventName].length; i++) {
      if (this.subscriptions[pointerId][eventName][i].fn === fn) {
        return i
      }
    }

    return -1
  }

  private getPointerById(id: number): ActionButton {
    if (id === 0) return ActionButton.POINTER
    else if (id === 1) return ActionButton.PRIMARY
    return ActionButton.SECONDARY
  }
}
