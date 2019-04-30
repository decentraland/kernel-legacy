import { log, NFTShape, Entity, engine, Transform, Vector3 } from 'decentraland-ecs/src'

const entity = new Entity()
entity.addComponent(new NFTShape(''))
entity.addComponent(
  new Transform({
    position: new Vector3(4, 2, 4)
  })
)
engine.addEntity(entity)

log('test running the cubes')
