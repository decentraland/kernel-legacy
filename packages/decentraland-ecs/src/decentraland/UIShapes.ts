import { ObservableComponent, DisposableComponent, getComponentId } from '../ecs/Component'
import { CLASS_ID, OnUUIDEvent, OnTextSubmit, OnChanged, Texture } from './Components'
import { Color3, Color4 } from './math'

/**
 * @alpha
 */
export abstract class UIShape extends ObservableComponent {
  /**
   * Defines if the entity and its children should be rendered
   */
  @ObservableComponent.field
  id: string | null = null

  @ObservableComponent.field
  visible: boolean = true

  @ObservableComponent.field
  opacity: number = 1

  @ObservableComponent.field
  zIndex: number = 0

  @ObservableComponent.field
  hAlign: string = 'center'

  @ObservableComponent.field
  vAlign: string = 'center'

  @ObservableComponent.uiValue
  width: string | number = '100px'

  @ObservableComponent.uiValue
  height: string | number = '50px'

  @ObservableComponent.uiValue
  positionX: string | number = '0px'

  @ObservableComponent.uiValue
  positionY: string | number = '0px'

  @ObservableComponent.field
  isPointerBlocker: boolean = false

  private _parent?: UIShape

  constructor(parent: UIShape | null) {
    super()
    if (parent) {
      this._parent = parent
      this.data.parentComponent = getComponentId(parent as any)
    }
  }

  get parent() {
    return this._parent
  }

  // @internal
  get parentComponent(): string | undefined {
    return this.data.parentComponent
  }
}

/**
 * @internal
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_FULLSCREEN_SHAPE)
export class UIFullScreenShape extends UIShape {
  constructor() {
    super(null)
  }
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_WORLD_SPACE_SHAPE)
export class UIWorldSpaceShape extends UIShape {
  constructor() {
    super(null)
  }
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_SCREEN_SPACE_SHAPE)
export class UIScreenSpaceShape extends UIShape {
  constructor() {
    super(null)
  }
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_CONTAINER_RECT)
export class UIContainerRectShape extends UIShape {
  @ObservableComponent.field
  adaptWidth: boolean = false

  @ObservableComponent.field
  adaptHeight: boolean = false

  @ObservableComponent.field
  thickness: number = 0

  @ObservableComponent.field
  color: Color3 = Color3.White()

  @ObservableComponent.field
  alignmentUsesSize: boolean = true
}

/**
 * @public
 */
export enum UIStackOrientation {
  VERTICAL,
  HORIZONTAL
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_CONTAINER_STACK)
export class UIContainerStackShape extends UIShape {
  @ObservableComponent.field
  adaptWidth: boolean = false

  @ObservableComponent.field
  adaptHeight: boolean = false

  @ObservableComponent.field
  opacity: number = 1

  @ObservableComponent.field
  color: Color3 = Color3.Black()

  @ObservableComponent.field
  stackOrientation: UIStackOrientation = UIStackOrientation.VERTICAL
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_BUTTON_SHAPE)
export class UIButtonShape extends UIShape {
  @ObservableComponent.field
  fontFamily: string = 'Arial'

  @ObservableComponent.field
  fontSize: number = 30

  @ObservableComponent.field
  fontWeight: string = 'normal'

  @ObservableComponent.field
  thickness: number = 0

  @ObservableComponent.field
  cornerRadius: number = 0

  @ObservableComponent.field
  color: Color3 = Color3.White()

  @ObservableComponent.field
  background: Color3 = Color3.Black()

  @ObservableComponent.field
  paddingTop: number = 0

  @ObservableComponent.field
  paddingRight: number = 0

  @ObservableComponent.field
  paddingBottom: number = 0

  @ObservableComponent.field
  paddingLeft: number = 0

  @ObservableComponent.field
  shadowBlur: number = 0

  @ObservableComponent.field
  shadowOffsetX: number = 0

  @ObservableComponent.field
  shadowOffsetY: number = 0

  @ObservableComponent.field
  shadowColor: Color3 = Color3.White()

  @ObservableComponent.field
  text: string = 'button'
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_TEXT_SHAPE)
export class UITextShape extends UIShape {
  @ObservableComponent.field
  outlineWidth: number = 0

  @ObservableComponent.field
  outlineColor: Color3 = Color3.White()

  @ObservableComponent.field
  color: Color3 = Color3.White()

  @ObservableComponent.field
  fontFamily: string = 'Arial'

  @ObservableComponent.field
  fontSize: number = 100

  @ObservableComponent.field
  fontWeight: string = 'normal'

  @ObservableComponent.field
  value: string = ''

  @ObservableComponent.field
  lineSpacing: number = 0

  @ObservableComponent.field
  lineCount: number = 0

  @ObservableComponent.field
  resizeToFit: boolean = false

  @ObservableComponent.field
  textWrapping: boolean = false

  @ObservableComponent.field
  shadowBlur: number = 0

  @ObservableComponent.field
  shadowOffsetX: number = 0

  @ObservableComponent.field
  shadowOffsetY: number = 0

  @ObservableComponent.field
  shadowColor: Color3 = Color3.White()

  @ObservableComponent.field
  hAlign: string = 'center'

  @ObservableComponent.field
  vAlign: string = 'center'

  @ObservableComponent.field
  hTextAlign: string = 'center'

  @ObservableComponent.field
  vTextAlign: string = 'center'

  @ObservableComponent.field
  paddingTop: number = 0

  @ObservableComponent.field
  paddingRight: number = 0

  @ObservableComponent.field
  paddingBottom: number = 0

  @ObservableComponent.field
  paddingLeft: number = 0
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_INPUT_TEXT_SHAPE)
export class UIInputTextShape extends UIShape {
  @ObservableComponent.field
  color: Color3 = Color3.White()

  @ObservableComponent.field
  thickness: number = 1

  @ObservableComponent.field
  fontFamily: string = 'Arial'

  @ObservableComponent.field
  fontSize: number = 100

  @ObservableComponent.field
  fontWeight: string = 'normal'

  @ObservableComponent.field
  value: string = ''

  @ObservableComponent.field
  placeholderColor: Color3 = Color3.White()

  @ObservableComponent.field
  placeholder: string = ''

  @ObservableComponent.field
  margin: number = 10

  @ObservableComponent.field
  maxWidth: number = 100

  @ObservableComponent.field
  autoStretchWidth: boolean = true

  @ObservableComponent.field
  background: Color3 = Color3.Black()

  @ObservableComponent.field
  focusedBackground: Color3 = Color3.Black()

  @ObservableComponent.field
  shadowBlur: number = 0

  @ObservableComponent.field
  shadowOffsetX: number = 0

  @ObservableComponent.field
  shadowOffsetY: number = 0

  @ObservableComponent.field
  shadowColor: Color3 = Color3.White()

  @ObservableComponent.field
  paddingTop: number = 0

  @ObservableComponent.field
  paddingRight: number = 0

  @ObservableComponent.field
  paddingBottom: number = 0

  @ObservableComponent.field
  paddingLeft: number = 0

  @OnUUIDEvent.uuidEvent
  onTextSubmitEvent: OnTextSubmit | null = null
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_IMAGE_SHAPE)
export class UIImageShape extends UIShape {
  @ObservableComponent.field
  sourceLeft: number = 0

  @ObservableComponent.field
  sourceTop: number = 0

  @ObservableComponent.field
  sourceWidth: number = 1

  @ObservableComponent.field
  sourceHeight: number = 1

  @ObservableComponent.component
  source?: Texture

  @ObservableComponent.field
  paddingTop: number = 0

  @ObservableComponent.field
  paddingRight: number = 0

  @ObservableComponent.field
  paddingBottom: number = 0

  @ObservableComponent.field
  paddingLeft: number = 0

  @ObservableComponent.field
  sizeInPixels: boolean = true

  constructor(parent: UIShape, source: Texture) {
    super(parent)
    this.source = source
  }
}

/**
 * @alpha
 */
@DisposableComponent('engine.shape', CLASS_ID.UI_SLIDER_SHAPE)
export class UISliderShape extends UIShape {
  @ObservableComponent.field
  valueX: number = 0

  @ObservableComponent.field
  valueY: number = 0

  @ObservableComponent.field
  borderColor: Color4 = Color4.White()

  @ObservableComponent.field
  backgroundColor: Color4 = Color4.Clear()

  @ObservableComponent.field
  isHorizontal: boolean = false

  @ObservableComponent.field
  isVertical: boolean = false

  @ObservableComponent.field
  paddingTop: number = 0

  @ObservableComponent.field
  paddingRight: number = 0

  @ObservableComponent.field
  paddingBottom: number = 0

  @ObservableComponent.field
  paddingLeft: number = 0

  @OnUUIDEvent.uuidEvent
  onChanged: OnChanged | null = null
}
