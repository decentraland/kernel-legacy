import { UIScreenSpaceShape, UIContainerRectShape, UIImageShape, Color4, Texture } from 'decentraland-ecs/src'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = Color4.Green()
container.width = '50%'
container.height = '50%'

const imageBack = new UIContainerRectShape(container)
imageBack.id = 'imageBack'
imageBack.color = Color4.Red()
imageBack.width = '128px'
imageBack.height = '128px'

const image = new UIImageShape(container, new Texture('img.png'))
image.id = 'testUIImage'
image.width = '128px'
image.height = '128px'
image.sourceWidth = 128
image.sourceHeight = 128
image.sourceTop = 0
image.sourceLeft = 0
image.paddingLeft = 10
image.paddingRight = 10
image.paddingTop = 10
image.paddingBottom = 10
image.isPointerBlocker = true
