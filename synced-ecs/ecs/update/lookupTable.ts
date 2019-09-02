import { addComponent } from '../reducers/addComponent'
import { addComponentClass } from '../reducers/addComponentClass'
import { addEntity } from '../reducers/addEntity'
import { changeEntityParent } from '../reducers/changeEntityParent'
import { removeComponent } from '../reducers/removeComponent'
import { removeComponentClass } from '../reducers/removeComponentClass'
import { removeEntity } from '../reducers/removeEntity'
import { updateComponent } from '../reducers/updateComponent'

export const lookupTable = {
  addComponent: addComponent,
  addComponentClass: addComponentClass,
  addEntity: addEntity,
  changeEntityParent: changeEntityParent,
  removeComponent: removeComponent,
  removeComponentClass: removeComponentClass,
  removeEntity: removeEntity,
  updateComponent: updateComponent
}
