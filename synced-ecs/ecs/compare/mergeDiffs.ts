import { Diff } from './Diff'

export function mergeDiffs(base: Diff, diff: Diff): Diff {
  return {
    newEntityIds: [...base.newEntityIds, ...diff.newEntityIds],
    removedEntityIds: [...base.removedEntityIds, ...diff.removedEntityIds],
    newParents: { ...base.newParents, ...diff.newParents },
    newComponentClasses: { ...base.newComponentClasses, ...diff.newComponentClasses },
    removedComponentClasses: { ...base.removedComponentClasses, ...diff.removedComponentClasses },
    newComponents: [...base.newComponents, ...diff.newComponents],
    removedComponents: { ...base.removedComponents, ...diff.removedComponents },
    updatedComponents: [...base.updatedComponents, ...diff.updatedComponents]
  }
}
