import { ColorString, WearableId } from '../decentraland/Types'
import { Component, ObservableComponent } from '../ecs/Component'
import { CLASS_ID } from './Components'

/**
 * @public
 */
@Component('engine.avatarShape', CLASS_ID.AVATAR_SHAPE)
export class AvatarShape extends ObservableComponent {
  @ObservableComponent.field
  id!: string

  @ObservableComponent.field
  name!: string

  @ObservableComponent.field
  bodyShape!: WearableId

  @ObservableComponent.field
  wearables!: WearableId[]

  @ObservableComponent.field
  skinColor!: ColorString

  @ObservableComponent.field
  hairColor!: ColorString

  @ObservableComponent.field
  eyeColor!: ColorString

  @ObservableComponent.field
  useDummyModel: boolean = false

  public static Dummy(): AvatarShape {
    const avatarShape = new AvatarShape()
    avatarShape.useDummyModel = true
    return avatarShape
  }
}
