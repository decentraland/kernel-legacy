import { generateDiff } from '../compare/generateDiff'
import { EntityId } from '../Entity'
import { ECS } from '../EntityComponentState'
import { emptyState } from '../generators/emptyState'
import { addComponent } from '../reducers/addComponent'
import { addComponentClass } from '../reducers/addComponentClass'
import { addEntity } from '../reducers/addEntity'
import { getEntityParent } from '../selectors/getEntityParent'
import { generateStringId } from '../util/generateStringId'

describe('Operations', () => {
  it('preliminary calls to validate overall functionality', () => {
    const empty = emptyState()

    const myEntity = '1'
    const s1 = addEntity(empty, myEntity)

    expect(getEntityParent(s1, myEntity)).toBe(empty.rootEntityId)

    const TransformId = '1'
    const TransformName = 'Transform'

    const s2 = addComponentClass(s1, TransformId, TransformName)

    const ComponentId = '241'
    const s3 = addComponent(
      s2,
      myEntity,
      TransformId,
      {
        position: { x: 0, y: 0, z: 0 }
      },
      ComponentId
    )

    generateDiff(empty, s3)

    function addNewTransform(state: ECS, targetEntity: EntityId, x: number, y: number, z: number) {
      const [value, seed] = generateStringId(state.seed)
      expect(value).toBeTruthy()
      return {
        ...addComponent(state, targetEntity, TransformId, {
          x,
          y,
          z
        }),
        seed
      }
    }
    addNewTransform(s2, myEntity, 0, 2, 3)
  })
})
