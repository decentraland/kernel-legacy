const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = Color3.Green()
container.width = '50%'
container.height = '50%'

const textInput = new UIInputTextShape(container)
textInput.id = 'textInput'
textInput.width = '100%'
textInput.height = '25px'
textInput.vAlign = 'bottom'
textInput.hAlign = 'left'
textInput.placeholder = 'Write yer shit here'
textInput.placeholderColor = Color3.Gray()
textInput.positionX = '10px'
textInput.positionY = '10px'


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
