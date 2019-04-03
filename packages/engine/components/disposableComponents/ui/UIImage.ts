import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { UIValue } from 'decentraland-ecs/src/ecs/UIValue'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIImageShape } from 'decentraland-ecs/src/decentraland/UIShapes'
import { SharedSceneContext } from 'engine/entities/SharedSceneContext'
import { UIControl } from './UIControl'

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

    this.control.sourceLeft = this.data.sourceLeft
    this.control.sourceTop = this.data.sourceTop
    this.control.sourceWidth = this.data.sourceWidth
    this.control.sourceHeight = this.data.sourceHeight

    if (this.data.source) {
      this.control.source = this.context.resolveUrl(this.data.source)
    } else {
      this.context.logger.warn(`Warning UIImage.source for ${this.data.id} is empty`)
    }

    this.control.width = `${this.data.width}px`
    this.control.height = `${this.data.height}px`
    this.control.top = `${-this.data.positionY}px`
    this.control.left = `${this.data.positionX}px`
    this.control.alpha = Math.max(0, Math.min(1, this.data.opacity))
    this.control.verticalAlignment = parseVerticalAlignment(this.data.vAlign)
    this.control.horizontalAlignment = parseHorizontalAlignment(this.data.hAlign)
    // missing this.uiEntity.fontWeight = this.data.fontWeight
    this.control.paddingTop = `${this.data.paddingTop}px`
    this.control.paddingLeft = `${this.data.paddingLeft}px`
    this.control.paddingRight = `${this.data.paddingRight}px`
    this.control.paddingBottom = `${this.data.paddingBottom}px`
    this.control.isVisible = this.data.visible
    this.control.isPointerBlocker = this.data.isPointerBlocker

    this.setParent(this.data.parentComponent)
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
