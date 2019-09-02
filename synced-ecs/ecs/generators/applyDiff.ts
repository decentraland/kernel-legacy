import { makeItRain } from '../util/makeItRain'

import { ECS } from '../EntityComponentState'
import { Diff } from '../compare/Diff'

import { removeEntity } from '../reducers/removeEntity'
import { removeComponentClass } from '../reducers/removeComponentClass'
import { removeComponent } from '../reducers/removeComponent'
import { addEntity } from '../reducers/addEntity'
import { addComponentClass } from '../reducers/addComponentClass'
import { addComponent } from '../reducers/addComponent'
import { changeEntityParent } from '../reducers/changeEntityParent'
import { updateComponent } from '../reducers/updateComponent'

export function applyDiff(state: ECS, diff: Diff): ECS {
  return makeItRain({
    state,
    operationMappings: [
      {
        elements: diff.removedEntityIds,
        operator: removeEntity
      },
      {
        elements: diff.removedComponentClasses,
        operator: removeComponentClass
      },
      {
        elements: diff.removedComponents,
        operator: removeComponent
      },
      {
        elements: diff.newEntityIds,
        operator: addEntity
      },
      {
        elements: diff.newComponentClasses,
        operator: addComponentClass
      },
      {
        elements: diff.newComponents,
        operator: addComponent
      },
      {
        elements: diff.newParents,
        operator: changeEntityParent
      },
      {
        elements: diff.updatedComponents,
        operator: updateComponent
      }
    ]
  })
}
