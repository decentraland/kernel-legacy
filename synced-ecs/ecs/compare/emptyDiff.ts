import { Diff } from './Diff'

export function emptyDiff(): Diff {
  return {
    newEntityIds: [],
    removedEntityIds: [],
    newParents: [],
    newComponentClasses: [],
    removedComponentClasses: [],
    newComponents: [],
    removedComponents: [],
    updatedComponents: []
  }
}
