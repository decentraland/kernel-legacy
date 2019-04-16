import {
  UIScreenSpaceShape,
  Color4,
  UIContainerStackShape,
  UIContainerRectShape,
  UIImageShape,
  Texture
} from 'decentraland-ecs/src'

const ui = new UIScreenSpaceShape()

const stackContainer = new UIContainerStackShape(ui)
stackContainer.name = 'testContainerStack'
stackContainer.color = Color4.Green()
stackContainer.width = '50%'
stackContainer.height = '50%'

const panel1 = new UIContainerRectShape(stackContainer)
panel1.name = 'testContainerRect1'
panel1.color = Color4.Blue()
panel1.width = '200px'
panel1.height = '200px'

const image = new UIImageShape(stackContainer, new Texture('img.png'))
image.name = 'testUIImage'
image.width = '100px'
image.height = '100px'
image.sourceWidth = 100
image.sourceHeight = 100

const panel2 = new UIContainerRectShape(stackContainer)
panel2.name = 'testContainerRect2'
panel2.color = Color4.Red()
panel2.width = '200px'
panel2.height = '200px'
