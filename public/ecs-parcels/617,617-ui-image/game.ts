const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = Color3.Green()
container.sizeInPixels = false
container.width = 0.5
container.height = 0.5
container.visible = true

const imageBack = new UIContainerRectShape(container)
imageBack.id = 'imageBack'
imageBack.color = Color3.Red()
imageBack.sizeInPixels = true
imageBack.width = 128
imageBack.height = 128
imageBack.visible = true

const image = new UIImageShape(container, 'img.png')
image.id = 'testUIImage'

image.width = 128
image.height = 128

image.sourceWidth = 128
image.sourceHeight = 128
image.sourceTop = 0
image.sourceLeft = 0
image.paddingLeft = 10
image.paddingRight = 10
image.paddingTop = 10
image.paddingBottom = 10
image.hAlign = 'right'
image.vAlign = 'bottom'

image.position = new Vector2(0, 0)
image.isPointerBlocker = true
