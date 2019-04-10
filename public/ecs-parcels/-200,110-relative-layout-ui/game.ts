const SEND_ICON = './images/send-icon.png'

const ui = new UIScreenSpaceShape()
const uiEntity = new Entity()
uiEntity.addComponentOrReplace(ui)
engine.addEntity(uiEntity)

const container = new UIContainerRectShape(ui)
container.width = 1
container.height = 1
container.color = Color3.White() // we set global text color here
container.hAlign = 'center'
container.vAlign = 'center'

// We add separate rect container to act as a background with opacity
const bg = new UIContainerRectShape(container)
bg.opacity = 0.2
bg.thickness = 1
// TODO: UI-Migration
// a bg.cornerRadius = 10
bg.color = Color3.Black()

// --- INVENTORY

const inventoryContainer = new UIContainerStackShape(container)
inventoryContainer.adaptWidth = true
// inventoryContainer.adaptHeight = true --- you can only set adaptWidth (X)OR adaptHeight for it to work correctly
inventoryContainer.width = '40%'
inventoryContainer.positionY = '-100px'
inventoryContainer.positionX = '10px'
// inventoryContainer.color = 'white' // previously set child text color
inventoryContainer.color = Color3.Blue()
inventoryContainer.hAlign = 'left'
inventoryContainer.vAlign = 'top'
inventoryContainer.vertical = true // when adapting height, set this to false

function generateInventoryItem(index: number) {
  const bg = new UIContainerRectShape(inventoryContainer)
  bg.id = `hmmm-${index}`
  bg.thickness = 1
  bg.color = Color3.Blue()
  // If `inventoryContainer.adaptWidth` OR `inventoryContainer.adaptHeight`
  // are set to true, you have to set width OR height of its children in pixels!
  bg.width = 1
  // TODO: UI-Migration
  bg.height = 1 // 60px
  bg.hAlign = 'center'
  bg.vAlign = 'top'

  const text = new UITextShape(bg)
  text.id = `hehe-${index}`
  text.value = `Item ${index}`
  text.vAlign = 'center'
  text.hAlign = 'center'
  text.resizeToFit = true
  text.fontSize = 10
  text.color = new Color3(1, 0, 0)
}

generateInventoryItem(1)
generateInventoryItem(2)
generateInventoryItem(3)
generateInventoryItem(4)

// --- RIGHT SIDE OF THE UI

let inputTextState = ''

const input = new UIInputTextShape(container)
input.color = Color3.White()
input.thickness = 1
input.fontFamily = 'Open Sans'
input.fontSize = 20
input.fontWeight = 'normal'
input.opacity = 1.0
input.placeholderColor = Color3.White()
input.value = inputTextState
input.placeholder = 'write something...'
input.margin = 10
input.color = Color3.Black()
input.focusedBackground = Color3.FromHexString('#00a4a4')
input.shadowBlur = 10
input.shadowOffsetX = 5
input.shadowOffsetY = 5
input.shadowColor = Color3.FromHexString('#c7c7c7')
input.hAlign = 'right'
input.vAlign = 'top'
input.width = '40%'
input.height = '30px'
input.positionY = '-230px'
input.paddingRight = 20
// When you want to bind event listener to UI component, you have to
// create new entity and add component with event listener to it
const inputEntity = new Entity()
inputEntity.addComponentOrReplace(input)
inputEntity.addComponentOrReplace(
  new OnChanged((data: { value: string }) => {
    inputTextState = data.value
  })
)
engine.addEntity(inputEntity)

const sendButton = new Entity()
const sendButtonShape = new UIImageShape(container, new Texture(SEND_ICON))
sendButtonShape.sourceWidth = '64px'
sendButtonShape.sourceHeight = '64px'
sendButtonShape.sourceTop = '0px'
sendButtonShape.sourceLeft = '0px'
sendButtonShape.width = '30px'
sendButtonShape.height = '30px'
sendButtonShape.hAlign = 'right'
sendButtonShape.position.y = -40
sendButtonShape.position.x = -20
sendButton.addComponentOrReplace(
  new OnClick(() => {
    if (inputTextState) {
      textFromInput.value = inputTextState
      // clear text from input
      input.value = ''
      inputTextState = ''
    }
  })
)
sendButton.addComponentOrReplace(sendButtonShape)
engine.addEntity(sendButton)

// --- SLIDERS

const valueFromSlider1 = new UITextShape(container)
valueFromSlider1.value = '0'
valueFromSlider1.vAlign = 'top'
valueFromSlider1.hAlign = 'right'
valueFromSlider1.width = '30px'
valueFromSlider1.fontSize = 30
valueFromSlider1.color = new Color3(1, 0, 0)

const valueFromSlider2 = new UITextShape(container)
valueFromSlider2.positionY = '-100px'
valueFromSlider2.value = '0'
valueFromSlider2.vAlign = 'top'
valueFromSlider2.hAlign = 'right'
valueFromSlider2.width = '30px'
valueFromSlider2.fontSize = 30
valueFromSlider2.color = Color3.Black()

const slider1 = new Entity()
const sliderShape1 = new UISliderShape(container)
sliderShape1.minimum = 0
sliderShape1.maximum = 10
sliderShape1.color = Color3.White()
sliderShape1.opacity = 1.0
sliderShape1.value = 0
sliderShape1.borderColor = Color3.White()
sliderShape1.background = Color3.Black()
sliderShape1.barOffset = '5px'
sliderShape1.thumbWidth = '30px'
sliderShape1.isThumbClamped = false
sliderShape1.isVertical = true
sliderShape1.hAlign = 'right'
sliderShape1.vAlign = 'top'
sliderShape1.width = '20px'
sliderShape1.height = '100px'
sliderShape1.positionY = '0px'
sliderShape1.positionX = '-60px'
slider1.addComponentOrReplace(
  new OnChanged((data: { value: number }) => {
    const value = Math.round(data.value)
    valueFromSlider1.value = value.toString()
  })
)
slider1.addComponentOrReplace(sliderShape1)
engine.addEntity(slider1)

const slider2 = new Entity()
const sliderShape2 = new UISliderShape(container)
sliderShape2.minimum = 0
sliderShape2.maximum = 10
sliderShape2.color = Color3.Purple()
sliderShape2.opacity = 1.0
sliderShape2.value = 0
sliderShape2.borderColor = new Color4(1, 0, 0, 1)
sliderShape2.background = Color3.Blue()
sliderShape2.barOffset = '5px'
sliderShape2.thumbWidth = '30px'
sliderShape2.isThumbCircle = true
sliderShape2.isThumbClamped = false
sliderShape2.isVertical = false
sliderShape2.hAlign = 'right'
sliderShape2.vAlign = 'top'
sliderShape2.width = '150px'
sliderShape2.height = '20px'
sliderShape2.positionY = '-130px'
sliderShape2.positionX = '-40px'
sliderShape2.swapOrientation = true
slider2.addComponentOrReplace(
  new OnChanged((data: { value: number }) => {
    const value = Math.round(data.value)
    valueFromSlider2.value = value.toString()
  })
)
slider2.addComponentOrReplace(sliderShape2)
engine.addEntity(slider2)

const topText = new UITextShape(container)
topText.value = 'Some text'
topText.vAlign = 'top'
topText.fontSize = 20
topText.width = '200px'
topText.height = '25px'
topText.paddingTop = 10
topText.outlineWidth = 1
topText.outlineColor = Color3.FromHexString('#add8e6')

const textFromInput = new UITextShape(container)
textFromInput.value = 'Type text to input and press send button'
textFromInput.hAlign = 'right'
textFromInput.vAlign = 'top'
textFromInput.positionY = '-200px'
textFromInput.fontSize = 15
textFromInput.resizeToFit = true
textFromInput.paddingRight = 10

// --- CLOSE BUTTON

const closeButton = new Entity()
const closeShape = new UIButtonShape(container)
closeShape.text = 'Close UI'
closeShape.fontSize = 15
closeShape.color = Color3.Black()
closeShape.background = Color3.Yellow()
closeShape.cornerRadius = 10
closeShape.thickness = 1
closeShape.width = '120px'
closeShape.height = '30px'
closeShape.vAlign = 'bottom'
closeShape.positionY = '80px'
closeShape.isPointerBlocker = false
closeButton.addComponentOrReplace(
  new OnClick(() => {
    ui.visible = false
  })
)
closeButton.addComponentOrReplace(closeShape)
engine.addEntity(closeButton)

// -----------------------------

// Let's place some trigger for opening some game UI (e.g. inventory) into the scene
// This TextShape is separate thing from screen-space UI
const instructionText = new TextShape('Open inventory by clicking on the box')
instructionText.width = 5
instructionText.fontSize = 40

const instructions = new Entity()
instructions.addComponentOrReplace(new Transform({ position: new Vector3(5, 1.5, 5) }))
instructions.addComponentOrReplace(instructionText)
engine.addEntity(instructions)

const uiTrigger = new Entity()
const transform = new Transform({ position: new Vector3(5, 1, 5), scale: new Vector3(0.3, 0.3, 0.3) })
uiTrigger.addComponentOrReplace(transform)

uiTrigger.addComponentOrReplace(
  new OnClick(() => {
    ui.visible = true
  })
)

uiTrigger.addComponentOrReplace(new BoxShape())

engine.addEntity(uiTrigger)
