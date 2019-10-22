import { CLASS_ID } from '../decentraland-ecs/src'
const engineInterface = require('../shared/proto/engineinterface_pb')

export function createProto(classId: number, component: { data: any }) {
  switch (classId) {
    case CLASS_ID.TRANSFORM:
      return engineInterface.PB_Transform(component.data)
    case CLASS_ID.UUID_CALLBACK:
      return engineInterface.PB_UUIDCallback(component.data)
    case CLASS_ID.BOX_SHAPE:
      return engineInterface.PB_BoxShape(component.data)
    case CLASS_ID.SPHERE_SHAPE:
      return engineInterface.PB_SphereShape(component.data)
    case CLASS_ID.PLANE_SHAPE:
      return engineInterface.PB_PlaneShape(component.data)
    case CLASS_ID.CONE_SHAPE:
      return engineInterface.PB_ConeShape(component.data)
    case CLASS_ID.CYLINDER_SHAPE:
      return engineInterface.PB_CylinderShape(component.data)
    case CLASS_ID.TEXT_SHAPE:
      return engineInterface.PB_TextShape(component.data)
    case CLASS_ID.NFT_SHAPE:
      return engineInterface.PB_NFTShape(component.data)

    case CLASS_ID.UI_WORLD_SPACE_SHAPE:
      throw new Error('Not implemented')
    case CLASS_ID.UI_SCREEN_SPACE_SHAPE:
      throw new Error('Not implemented')
    case CLASS_ID.UI_CONTAINER_RECT:
      return engineInterface.PB_UIContainerRect(component.data)
    case CLASS_ID.UI_CONTAINER_STACK:
      return engineInterface.PB_UIContainerStack(component.data)
    case CLASS_ID.UI_TEXT_SHAPE:
      return engineInterface.PB_UITextShape(component.data)
    case CLASS_ID.UI_INPUT_TEXT_SHAPE:
      return engineInterface.PB_UIInputTextShape(component.data)
    case CLASS_ID.UI_IMAGE_SHAPE:
      return engineInterface.PB_UIImageShape(component.data)
    case CLASS_ID.UI_SLIDER_SHAPE:
      throw new Error('Not implemented')

    case CLASS_ID.CIRCLE_SHAPE:
      return engineInterface.PB_CircleShape(component.data)
    case CLASS_ID.BILLBOARD:
      return engineInterface.PB_Billboard(component.data)

    case CLASS_ID.ANIMATION:
      throw new Error('Not implemented')
    case CLASS_ID.UI_FULLSCREEN_SHAPE:
      throw new Error('Not implemented')

    case CLASS_ID.UI_BUTTON_SHAPE:
      return engineInterface.PB_UIButtonShape(component.data)

    case CLASS_ID.GLTF_SHAPE:
      return engineInterface.PB_GLTFShape(component.data)
    case CLASS_ID.OBJ_SHAPE:
      return engineInterface.PB_ObjShape(component.data)
    case CLASS_ID.AVATAR_SHAPE:
      return engineInterface.PB_AvatarShape(component.data)
    case CLASS_ID.BASIC_MATERIAL:
      return engineInterface.PB_BasicMaterial(component.data)
    case CLASS_ID.PBR_MATERIAL:
      return engineInterface.PB_Material(component.data)

    case CLASS_ID.HIGHLIGHT_ENTITY:
      throw new Error('Not implemented')
    case CLASS_ID.TEXTURE:
      return engineInterface.PB_Texture(component.data)
    case CLASS_ID.AUDIO_CLIP:
      return engineInterface.PB_AudioClip(component.data)
    case CLASS_ID.AUDIO_SOURCE:
      return engineInterface.PB_AudioSource(component.data)
    case CLASS_ID.GIZMOS:
      throw new Error('Not implemented')
    default:
      throw new Error('Not implemented')
  }
}
