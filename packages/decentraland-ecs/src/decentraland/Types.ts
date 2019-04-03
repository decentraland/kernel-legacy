import { ReadOnlyVector3, ReadOnlyQuaternion } from './math'

export type ModuleDescriptor = {
  rpcHandle: string
  methods: MethodDescriptor[]
}

export type MethodDescriptor = { name: string }

export type DecentralandInterface = {
  /** are we running in debug mode? */
  DEBUG: boolean

  /** update the entity shape */
  updateEntity?: never

  /** log function */
  log(...a: any[]): void

  /** error function */
  error(message: string, data?: any): void

  // LIFECYCLE

  /** update tick */
  onUpdate(cb: (deltaTime: number) => void): void

  /** called when it is time to wake the sandbox */
  onStart(cb: Function): void

  // ENTITIES

  /** create the entity in the engine */
  addEntity(entityId: string): void

  /** remove the entity from the engine */
  removeEntity(entityId: string): void

  /** called after adding a component to the entity or after updating a component */
  updateEntityComponent(entityId: string, componentName: string, classId: number, json: string): void

  /** called after adding a DisposableComponent to the entity */
  attachEntityComponent(entityId: string, componentName: string, componentId: string): void

  /** called after removing a component from the entity */
  removeEntityComponent(entityId: string, componentName: string): void

  /** set a new parent for the entity */
  setParent(entityId: string, parentId: string): void

  // COMPONENTS

  /** called after creating a component in the kernel  */
  componentCreated(componentId: string, componentName: string, classId: number): void

  /** colled after removing a component from the kernel */
  componentDisposed(componentId: string): void

  /** called after globally updating a component */
  componentUpdated(componentId: string, json: string): void

  // EVENTS

  /** event from the engine */
  onEvent(cb: (event: EngineEvent) => void): void

  /** subscribe to specific events, events will be handled by the onEvent function */
  subscribe(eventName: string): void

  /** unsubscribe to specific event */
  unsubscribe(eventName: string): void

  // MODULES

  /** load a module */
  loadModule(moduleName: string): PromiseLike<ModuleDescriptor>

  /** called when calling a module method */
  callRpc(rpcHandle: string, methodName: string, args: ArrayLike<any>): PromiseLike<any>
}

export type PointerEvent = {
  /** Origin of the ray, relative to the scene */
  origin: ReadOnlyVector3
  /** Direction vector of the ray (normalized) */
  direction: ReadOnlyVector3
  /** ID of the pointer that triggered the event */
  pointerId: number
  /** Does this pointer event hit any object? */
  hit?: {
    /** Length of the ray */
    length: number
    /** If the ray hits a mesh the intersection point will be this */
    hitPoint: ReadOnlyVector3
    /** If the mesh has a name, it will be assigned to meshName */
    meshName: string
    /** Normal of the hit */
    normal: ReadOnlyVector3
    /** Normal of the hit, in world space */
    worldNormal: ReadOnlyVector3
    /** Hit entity ID if any */
    entityId: string
  }
}

/**
 * @public
 */
export interface IEvents {
  /**
   * `positionChanged` is triggered when the position of the camera changes
   * This event is throttled to 10 times per second.
   */
  positionChanged: {
    /** Position relative to the base parcel of the scene */
    position: ReadOnlyVector3

    /** Camera position, this is a absolute world position */
    cameraPosition: ReadOnlyVector3

    /** Eye height, in meters. */
    playerHeight: number
  }

  /**
   * `rotationChanged` is triggered when the rotation of the camera changes.
   * This event is throttled to 10 times per second.
   */
  rotationChanged: {
    /** Degree vector. Same as entities */
    rotation: ReadOnlyVector3
    /** Rotation quaternion, useful in some scenarios. */
    quaternion: ReadOnlyQuaternion
  }

  /**
   * `pointerUp` is triggered when the user releases an input pointer.
   * It could be a VR controller, a touch screen or the mouse.
   */
  pointerUp: PointerEvent

  /**
   * `pointerDown` is triggered when the user press an input pointer.
   * It could be a VR controller, a touch screen or the mouse.
   */
  pointerDown: PointerEvent

  /**
   * `chatMessage` is triggered when the user sends a message through chat entity.
   */
  chatMessage: {
    id: string
    sender: string
    message: string
    isCommand: boolean
  }

  /**
   * `onChange` is triggered when an entity changes its own internal state.
   * Dispatched by the `ui-*` entities when their value is changed. It triggers a callback.
   * Notice: Only entities with ID will be listening for click events.
   */
  onChange: {
    value?: any
    /** ID of the pointer that triggered the event */
    pointerId?: number
  }

  /**
   * `onFocus` is triggered when an entity focus is active.
   * Dispatched by the `ui-input` and `ui-password` entities when the value is changed.
   * It triggers a callback.
   *
   * Notice: Only entities with ID will be listening for click events.
   */
  onFocus: {
    /** ID of the entitiy of the event */
    entityId: string
    /** ID of the pointer that triggered the event */
    pointerId: number
  }

  /**
   * `onBlur` is triggered when an entity loses its focus.
   * Dispatched by the `ui-input` and `ui-password` entities when the value is changed.
   *  It triggers a callback.
   *
   * Notice: Only entities with ID will be listening for click events.
   */
  onBlur: {
    /** ID of the entitiy of the event */
    entityId: string
    /** ID of the pointer that triggered the event */
    pointerId: number
  }

  /** The onClick event is only used for UI elements */
  onClick: {
    entityId: string
  }

  /**
   * This event gets triggered when an entity leaves the scene fences.
   */
  entityOutOfScene: {
    entityId: string
  }

  /**
   * This event gets triggered when an entity enters the scene fences.
   */
  entityBackInScene: {
    entityId: string
  }

  /**
   * After checking entities outside the fences, if any is outside, this event
   * will be triggered with all the entities outside the scene.
   */
  entitiesOutOfBoundaries: {
    entities: string[]
  }

  uuidEvent: {
    uuid: string
    payload: any
  }

  onTextSubmit: {
    message: string
  }

  metricsUpdate: {
    given: Record<string, number>
    limit: Record<string, number>
  }

  limitsExceeded: {
    given: Record<string, number>
    limit: Record<string, number>
  }

  /** For gizmos */
  gizmoEvent: GizmoDragEndEvent | GizmoSelectedEvent

  // @internal
  externalAction: {
    type: string
    [key: string]: any
  }
}

export type GizmoDragEndEvent = {
  type: 'gizmoDragEnded'
  transform: {
    position: ReadOnlyVector3
    rotation: ReadOnlyQuaternion
    scale: ReadOnlyVector3
  }
  entityId: string
}

export type GizmoSelectedEvent = {
  type: 'gizmoSelected'
  gizmoType: 'MOVE' | 'ROTATE' | 'SCALE' | 'NONE'
  entityId: string
}

export type IEventNames = keyof IEvents

export type EngineEvent<T extends IEventNames = IEventNames, V = IEvents[T]> = {
  /** eventName */
  type: T
  data: V
}
