import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIControl } from './UIControl'
import { UIContainerRectShape } from 'decentraland-ecs/src/decentraland/UIShapes'

const schemaValidator = createSchemaValidator({
  opacity: { type: 'number', default: 1 },
  adaptWidth: { type: 'boolean', default: false },
  adaptHeight: { type: 'boolean', default: false },
  thickness: { type: 'number', default: 0 },
  width: { type: 'number', default: 1 },
  height: { type: 'number', default: 1 },
  position: { type: 'vector2', default: { x: 0, y: 0 } },
  color: { type: 'color4', default: new BABYLON.Color4(1, 1, 1, 1) },
  background: { type: 'color4', default: new BABYLON.Color4(0, 0, 0, 0) },
  hAlign: { type: 'string', default: 'center' },
  vAlign: { type: 'string', default: 'center' },
  visible: { type: 'boolean', default: true }
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
    this.control.top = this.data.position.y
    this.control.left = this.data.position.x
    this.control.color = this.data.color.toHexString()
    this.control.background = this.data.background.toHexString()
    this.control.isVisible = this.data.visible

    this.setParent(this.data.parentComponent)
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_CONTAINER_RECT, UIContainerRect)
