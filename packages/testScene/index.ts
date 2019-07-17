import { engine, Entity, Transform, BoxShape, MVector3 } from '@dcl/scene-api'

const entity = new Entity()
entity.addComponent(
  new Transform({
    position: new MVector3(1, 1, 1)
  })
)
entity.addComponent(new BoxShape())
engine.addEntity(entity)
