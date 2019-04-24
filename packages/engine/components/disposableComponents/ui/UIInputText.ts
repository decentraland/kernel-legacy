import { DisposableComponent } from '../DisposableComponent'
import { CLASS_ID } from 'decentraland-ecs/src'
import { UIValue } from 'decentraland-ecs/src/ecs/UIValue'
import { BaseEntity } from 'engine/entities/BaseEntity'
import { createSchemaValidator } from '../../helpers/schemaValidator'
import { parseVerticalAlignment, parseHorizontalAlignment } from 'engine/entities/utils/parseAttrs'
import { UIInputTextShape } from 'decentraland-ecs/src/decentraland/UIShapes'
import { SharedSceneContext } from 'engine/entities/SharedSceneContext'
import { UIControl } from './UIControl'
import { IEvents } from 'decentraland-ecs/src/decentraland/Types'
import { Color3 } from 'babylonjs'

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
  opacity: { type: 'number', default: 1.0 },

  paddingTop: { type: 'number', default: 0 },
  paddingRight: { type: 'number', default: 0 },
  paddingBottom: { type: 'number', default: 0 },
  paddingLeft: { type: 'number', default: 0 },

  thickness: { type: 'number', default: 1 },
  fontFamily: { type: 'string', default: 'Arial' },
  fontSize: { type: 'number', default: 100 },
  fontWeight: { type: 'number', default: 'normal' },
  value: { type: 'string', default: '' },
  placeholderColor: { type: 'color', default: Color3.White() },
  placeholder: { type: 'string', default: '' },
  margin: { type: 'number', default: 10 },
  maxWidth: { type: 'number', default: 100 },
  autoStretchWidth: { type: 'boolean', default: true },
  background: { type: 'string', default: 'black' },
  focusedBackground: { type: 'string', default: 'black' },
  shadowBlur: { type: 'number', default: 0 },
  shadowOffsetX: { type: 'number', default: 0 },
  shadowOffsetY: { type: 'number', default: 0 },
  shadowColor: { type: 'color', default: Color3.White() }
})

class UIInputText extends UIControl<UIInputTextShape, BABYLON.GUI.InputText> {
  control = new BABYLON.GUI.InputText('input')

  constructor(ctx: SharedSceneContext, uuid: string) {
    super(ctx, uuid)

    this.control.onTextChangedObservable.add($ => {
      this.dispatchOnChanged({ pointerId: -1, value: $.text })
    })
    this.control.onFocusObservable.add(_ => {
      this.dispatchOnFocus({ entityId: this.uuid, pointerId: -1 })
    })
    this.control.onBlurObservable.add(_ => {
      this.dispatchOnBlur({ entityId: this.uuid, pointerId: -1 })
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
      if (this.control.onTextChangedObservable.hasObservers()) {
        this.control.onTextChangedObservable.clear()
      }
      if (this.control.onFocusObservable.hasObservers()) {
        this.control.onFocusObservable.clear()
      }
      if (this.control.onBlurObservable.hasObservers()) {
        this.control.onBlurObservable.clear()
      }
      this.control.dispose()
      delete this.control
    }

    super.dispose()
  }

  async updateData(data: UIInputTextShape): Promise<void> {
    this.data = schemaValidator(data)
    this.control.alpha = Math.max(0, Math.min(1, this.data.opacity))
    this.control.color = this.data.color.toHexString()
    this.control.thickness = this.data.thickness
    this.control.fontFamily = 'Arial'
    this.control.fontSize = this.data.fontSize
    this.control.zIndex = 0
    this.control.margin = `${this.data.margin}px`
    this.control.maxWidth = this.data.maxWidth
    this.control.autoStretchWidth = this.data.autoStretchWidth
    this.control.shadowBlur = this.data.shadowBlur
    this.control.shadowOffsetX = this.data.shadowOffsetX
    this.control.shadowOffsetY = this.data.shadowOffsetY
    this.control.shadowColor = this.data.shadowColor.toHexString()
    this.control.placeholderText = this.data.placeholder
    this.control.placeholderColor = this.data.placeholderColor.toHexString()
    this.control.text = this.data.value
    this.control.focusedBackground = this.data.focusedBackground.toHexString()
    this.control.background = this.data.background.toHexString()
    this.control.horizontalAlignment = parseHorizontalAlignment(this.data.hAlign)
    this.control.verticalAlignment = parseVerticalAlignment(this.data.vAlign)
    this.control.fontWeight = this.data.fontWeight
    this.control.paddingTop = this.data.paddingTop
    this.control.paddingRight = this.data.paddingRight
    this.control.paddingBottom = this.data.paddingBottom
    this.control.paddingLeft = this.data.paddingLeft
    this.control.width = this.data.width
    this.control.height = this.data.height
    this.control.top = -this.data.positionY
    this.control.left = this.data.positionX
    this.control.isVisible = this.data.visible
    this.control.isPointerBlocker = this.data.isPointerBlocker

    this.data.parentComponent && this.setParent(this.data.parentComponent)
  }

  dispatchOnChanged = (data: IEvents['onChange']) => {
    this.entities.forEach($ => $.dispatchUUIDEvent('onChange', data))
  }

  dispatchOnFocus = (data: IEvents['onFocus']) => {
    this.entities.forEach($ => $.dispatchUUIDEvent('onFocus', data))
  }

  dispatchOnBlur = (data: IEvents['onBlur']) => {
    this.entities.forEach($ => $.dispatchUUIDEvent('onBlur', data))
  }
}

DisposableComponent.registerClassId(CLASS_ID.UI_INPUT_TEXT_SHAPE, UIInputText)
