import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { UIValue } from 'decentraland-ecs/src/ecs/UIValue'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIImage as UIImageShape } from 'decentraland-ecs/src/decentraland/UIShapes'
import { SharedSceneContext } from 'engine/entities/SharedSceneContext'
import { UIControl } from './UIControl'
import { Texture } from '../Texture'

const schemaValidator = createSchemaValidator({
  id: { type: 'string', default: null },
  visible: { type: 'boolean', default: true },
  hAlign: { type: 'string', default: 'center' },
  vAlign: { type: 'string', default: 'center' },
  zIndex: { type: 'number', default: 0 },
  positionX: { type: 'uiValue', default: new UIValue(0) },
  positionY: { type: 'uiValue', default: new UIValue(0) },
  width: { type: 'number', default: 100 },
  height: { type: 'number', default: 20 },
  isPointerBlocker: { type: 'boolean', default: false },

  opacity: { type: 'number', default: 1 },

  paddingTop: { type: 'number', default: 0 },
  paddingRight: { type: 'number', default: 0 },
  paddingBottom: { type: 'number', default: 0 },
  paddingLeft: { type: 'number', default: 0 },

  sourceLeft: { type: 'number', default: 0 },
  sourceTop: { type: 'number', default: 0 },
  sourceWidth: { type: 'number', default: 1 },
  sourceHeight: { type: 'number', default: 1 },
  sizeInPixels: { type: 'boolean', default: true },
  source: { type: 'string', default: null }
})

class UIImage extends UIControl<UIImageShape, BABYLON.GUI.Image> {
  control = new BABYLON.GUI.Image('image', '')

  constructor(ctx: SharedSceneContext, uuid: string) {
    super(ctx, uuid)

    this.control.onPointerUpObservable.add($ => {
      this.dispatchOnClick($.buttonIndex)
    })
  }

  onAttach(_entity: BaseEntity): void {
    // noop
  }

  onDetach(_entity: BaseEntity): void {
    // noop
  }

  dispose() {
    if (this.control) {
      this.control.dispose()
      delete this.control
    }

    super.dispose()
  }

  async updateData(data: UIImageShape): Promise<void> {
    this.data = schemaValidator(data)
    // @ts-ignore
    this.control.sourceLeft = parseInt(this.data.sourceLeft, 10)
    // @ts-ignore
    this.control.sourceTop = parseInt(this.data.sourceTop, 10)
    // @ts-ignore
    this.control.sourceWidth = parseInt(this.data.sourceWidth, 10)
    // @ts-ignore
    this.control.sourceHeight = parseInt(this.data.sourceHeight, 10)

    if (data.source) {
      const texture = await Texture.getFromComponent(this.context, data.source as any)

      this.contributions.textures.clear()

      if (texture) {
        this.contributions.textures.add(texture)
        this.control.source = texture.url
      }
    }

    this.control.width = this.data.width
    this.control.height = this.data.height
    this.control.top = this.data.positionX
    this.control.left = this.data.positionY
    this.control.alpha = Math.max(0, Math.min(1, this.data.opacity))
    this.control.verticalAlignment = parseVerticalAlignment(this.data.vAlign)
    this.control.horizontalAlignment = parseHorizontalAlignment(this.data.hAlign)
    // missing this.uiEntity.fontWeight = this.data.fontWeight
    this.control.paddingTop = this.data.paddingTop
    this.control.paddingLeft = this.data.paddingLeft
    this.control.paddingRight = this.data.paddingRight
    this.control.paddingBottom = this.data.paddingBottom
    this.control.isVisible = this.data.visible
    this.control.isPointerBlocker = this.data.isPointerBlocker

    this.data.parentComponent && this.setParent(this.data.parentComponent)
  }

  dispatchOnClick = (pointerId: number) => {
    this.entities.forEach($ =>
      $.dispatchUUIDEvent('onClick', {
        entityId: $.uuid
      })
    )
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_IMAGE_SHAPE, UIImage)
