import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID, Color3 } from 'decentraland-ecs/src'
import { UIValue } from 'decentraland-ecs/src/ecs/UIValue'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIControl } from './UIControl'
import { UIContainerRect as UIContainerRectShape } from 'decentraland-ecs/src/decentraland/UIShapes'

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
  color: { type: 'color', default: Color3.White() },

  adaptWidth: { type: 'boolean', default: false },
  adaptHeight: { type: 'boolean', default: false },
  thickness: { type: 'number', default: 0 },
  background: { type: 'color', default: Color3.Black() }
})

export class UIContainerRect extends UIControl<UIContainerRectShape, BABYLON.GUI.Rectangle> {
  control = new BABYLON.GUI.Rectangle('rect')

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

  async updateData(data: UIContainerRectShape): Promise<void> {
    this.data = schemaValidator(data)
    this.control.adaptWidthToChildren = this.data.adaptWidth
    this.control.adaptHeightToChildren = this.data.adaptHeight
    this.control.verticalAlignment = parseVerticalAlignment(this.data.vAlign)
    this.control.horizontalAlignment = parseHorizontalAlignment(this.data.hAlign)
    this.control.thickness = this.data.thickness
    this.control.alpha = Math.max(0, Math.min(1, this.data.opacity))
    this.control.width = this.data.width
    this.control.height = this.data.height
    this.control.top = -this.data.positionY
    this.control.left = this.data.positionX
    this.control.background = this.data.color.toHexString()
    this.control.isVisible = this.data.visible

    this.data.parentComponent && this.setParent(this.data.parentComponent)
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_CONTAINER_RECT, UIContainerRect)
