export const ComponentAdded = 'ComponentAdded'
export const ComponentRemoved = 'ComponentAdded'
export const DisposableComponentCreated = 'DisposableComponentCreated'
export const DisposableComponentRemoved = 'DisposableComponentRemoved'
export const DisposableComponentUpdated = 'DisposableComponentUpdated'
export const ParentChanged = 'ParentChanged'

export type DecentralandECSEvent =
  | typeof ComponentAdded
  | typeof ComponentRemoved
  | typeof DisposableComponentCreated
  | typeof DisposableComponentRemoved
  | typeof DisposableComponentUpdated
  | typeof ParentChanged
