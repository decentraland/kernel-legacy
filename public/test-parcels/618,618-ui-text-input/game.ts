import {
  UIScreenSpaceShape,
  UIContainerRectShape,
  Color4,
  UIInputTextShape,
  OnTextSubmit,
  log
} from 'decentraland-ecs/src'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.name = 'testRectContainer'
container.color = Color4.Green()
container.width = '50%'
container.height = '50%'

const textInput = new UIInputTextShape(container)
textInput.name = 'textInput'
textInput.width = '80%'
textInput.height = '25px'
textInput.vAlign = 'bottom'
textInput.hAlign = 'left'
textInput.fontSize = 10
textInput.placeholder = 'Write message here'
textInput.placeholderColor = Color4.Gray()
textInput.positionX = '10%'
textInput.positionY = '10px'
textInput.onTextSubmit = new OnTextSubmit(x => {
  container.color = Color4.Red()
  log('submitted text! ' + x.text)
})

// const entity = new Entity()
// entity.addComponentOrReplace(textInput)
// entity.addComponentOrReplace(event)
// engine.addEntity(entity)

// const imageBack = new UIContainerRectShape(container)
// imageBack.id = 'imageBack'
// imageBack.color = Color3.Red()
// imageBack.width = '128px'
// imageBack.height = '128px'

// const image = new UIImageShape(container, 'img.png')
// image.id = 'testUIImage'
// image.width = '128px'
// image.height = '128px'
// image.sourceWidth = 128
// image.sourceHeight = 128
// image.sourceTop = 0
// image.sourceLeft = 0
// image.paddingLeft = 10
// image.paddingRight = 10
// image.paddingTop = 10
// image.paddingBottom = 10
// image.isPointerBlocker = true
