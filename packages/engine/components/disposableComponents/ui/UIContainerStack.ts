import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID, Color3 } from 'decentraland-ecs/src'
import { UIValue } from 'decentraland-ecs/src/ecs/UIValue'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { UIControl } from './UIControl'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import {
  UIContainerStack as UIContainerStackShape,
  UIStackOrientation
} from 'decentraland-ecs/src/decentraland/UIShapes'

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

  color: { type: 'color', default: Color3.White() },
  opacity: { type: 'number', default: 1 },

  adaptWidth: { type: 'boolean', default: false },
  adaptHeight: { type: 'boolean', default: false },
  background: { type: 'string', default: 'transparent' },
  stackOrientation: { type: 'UIStackOrientation', default: UIStackOrientation.VERTICAL }
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
    this.control.left = this.data.positionX
    this.control.top = -this.data.positionY
    this.control.background = this.data.color.toHexString()
    this.control.isVisible = this.data.visible
    this.control.isVertical = this.data.stackOrientation === UIStackOrientation.VERTICAL

    // Only set height manually if the stack container is not in vertical mode
    if (this.data.stackOrientation !== UIStackOrientation.VERTICAL) {
      this.control.height = this.data.height
    }

    this.data.parentComponent && this.setParent(this.data.parentComponent)
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_CONTAINER_STACK, UIContainerStack)
