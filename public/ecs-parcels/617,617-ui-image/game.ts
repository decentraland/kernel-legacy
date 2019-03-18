const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = new Color4(0, 255, 0, 255)
container.sizeInPixels = false
container.width = 0.5
container.height = 0.5

const image = new UIImageShape(container, 'img.png')
image.id = 'testUIImage'
image.width = 256
image.height = 256
image.source = 'img.png'
image.sourceWidth = 256
image.sourceHeight = 256
image.sourceTop = 0
image.sourceLeft = 0
image.hAlign = 'center'
image.position = new Vector2(0, 0)
image.isPointerBlocker = true
