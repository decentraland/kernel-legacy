import { ECS } from '../EntityComponentState'
import { Diff } from './Diff'
import { EntityId } from '../Entity'
import { Component, ComponentClassId, ComponentName } from '../Component'

import { entityExists } from '../selectors/entityExists'
import { getEntityIds } from '../selectors/getEntityIds'
import { parentChanged } from './selectors/parentChanged'
import { getEntityParent } from '../selectors/getEntityParent'
import { getComponentName } from '../selectors/getComponentName'
import { getComponentClasses } from '../selectors/getComponentClasses'
import { hasComponentClass } from '../selectors/componentClassExists'
import { differentComponent } from './selectors/differentComponent'
import { getComponent } from '../selectors/getComponent'
import { componentExists } from '../selectors/componentExists'
import { getComponents } from '../selectors/getComponents'
import { getComponentIds } from '../selectors/getComponentIds'
import { getComponentParentEntity } from '../selectors/getComponentParentEntity'

export function generateDiff(from: ECS, to: ECS): Diff {
  const newEntityIds = getEntityIds(to).filter(_ => !entityExists(from, _))
  const removedEntityIds = getEntityIds(from).filter(_ => !entityExists(to, _))
  const newParents = getEntityIds(to)
    .filter(_ => parentChanged(from, to, _))
    .map(_ => [_, getEntityParent(to, _)] as [EntityId, EntityId])
  const newComponentClasses = getComponentClasses(to)
    .filter(_ => !hasComponentClass(from, _))
    .map(_ => [_, getComponentName(to, _)] as [ComponentClassId, ComponentName])
  const removedComponentClasses = getComponentClasses(from).filter(_ => !hasComponentClass(to, _))
  const newComponents = getComponents(to)
    .filter(_ => !componentExists(from, _))
    .map(_ => [getComponentParentEntity(to, _), _] as [EntityId, Component])
  const removedComponents = getComponentIds(from).filter(_ => !componentExists(to, _))
  const updatedComponents = getComponents(to).filter(_ =>
    differentComponent(getComponent(from, _), getComponent(to, _))
  )
  return {
    newEntityIds,
    removedEntityIds,
    newParents,
    newComponentClasses,
    removedComponentClasses,
    newComponents,
    removedComponents,
    updatedComponents
  }
}
