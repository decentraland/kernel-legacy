import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { UIControl } from './UIControl'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIContainerStackShape } from 'decentraland-ecs/src/decentraland/UIShapes'
import { Vector2 } from 'babylonjs';

const schemaValidator = createSchemaValidator({
  id: { type: 'string', default: null },
  visible: { type: 'boolean', default: true },
  hAlign: { type: 'string', default: 'center' },
  vAlign: { type: 'string', default: 'center' },
  zIndex: { type: 'number', default: 0 },
  position: { type: 'vector2', default: new Vector2(0, 0) },
  width: { type: 'number', default: 100 },
  height: { type: 'number', default: 20 },
  isPointerBlocker: { type: 'boolean', default: false },

  color: { type: 'string', default: 'white' },
  opacity: { type: 'number', default: 1 },

  adaptWidth: { type: 'boolean', default: false },
  adaptHeight: { type: 'boolean', default: false },
  background: { type: 'string', default: 'transparent' },
  vertical: { type: 'boolean', default: true },
})

export class UIContainerStack extends UIControl<UIContainerStackShape, BABYLON.GUI.StackPanel> {
  control = new BABYLON.GUI.StackPanel('stack')

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

  async updateData(data: UIContainerStackShape): Promise<void> {
    this.data = schemaValidator(data)
    this.control.adaptWidthToChildren = this.data.adaptWidth
    this.control.adaptHeightToChildren = this.data.adaptHeight
    this.control.verticalAlignment = parseVerticalAlignment(this.data.vAlign)
    this.control.horizontalAlignment = parseHorizontalAlignment(this.data.hAlign)
    this.control.alpha = Math.max(0, Math.min(1, this.data.opacity))
    this.control.width = this.data.width
    this.control.left = this.data.position.x
    this.control.top = -this.data.position.y
    this.control.color = this.data.color.toHexString()
    this.control.background = this.data.background.toHexString()
    this.control.isVisible = this.data.visible
    this.control.isVertical = this.data.vertical
    // Only set height manually if the stack container is not in vertical mode
    if (!this.data.vertical) {
      this.control.height = this.data.height
    }

    this.setParent(this.data.parentComponent)
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_CONTAINER_STACK, UIContainerStack)
