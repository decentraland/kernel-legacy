import { ObservableComponent, Component } from '../ecs/Component'
import { CLASS_ID } from './Components'
import { Color4 } from '@dcl/utils/math/Color4'

/**
 * @public
 */
export class Wearable {
  category!: string
  contentName!: string
}

/**
 * @public
 */
export class Skin {
  color!: Color4
}

/**
 * @public
 */
export class Hair {
  color!: Color4
}

/**
 * @public
 */
export class Face {
  mask!: string
  texture!: string
}

/**
 * @public
 */
export class Eyes extends Face {
  color!: Color4
}

/**
 * @public
 */
@Component('engine.avatarShape', CLASS_ID.AVATAR_SHAPE)
export class AvatarShape extends ObservableComponent {
  @ObservableComponent.field
  id!: string

  @ObservableComponent.field
  baseUrl!: string

  @ObservableComponent.field
  name!: string

  @ObservableComponent.field
  bodyShape!: Wearable

  @ObservableComponent.field
  wearables!: Wearable[]

  @ObservableComponent.field
  skin!: Skin

  @ObservableComponent.field
  hair!: Hair

  @ObservableComponent.field
  eyes!: Eyes

  @ObservableComponent.field
  eyebrows!: Face

  @ObservableComponent.field
  mouth!: Face
}
