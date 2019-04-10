import {
  UIScreenSpaceShape,
  Color3,
  UIContainerStackShape,
  UIContainerRectShape,
  UIImageShape,
  Texture
} from 'decentraland-ecs/src'

const ui = new UIScreenSpaceShape()

const stackContainer = new UIContainerStackShape(ui)
stackContainer.id = 'testContainerStack'
stackContainer.color = Color3.Green()
stackContainer.width = '50%'
stackContainer.height = '50%'

const panel1 = new UIContainerRectShape(stackContainer)
panel1.id = 'testContainerRect1'
panel1.color = Color3.Blue()
panel1.width = '200px'
panel1.height = '200px'

const image = new UIImageShape(stackContainer, new Texture('img.png'))
image.id = 'testUIImage'
image.width = '100px'
image.height = '100px'
image.sourceWidth = 100
image.sourceHeight = 100

const panel2 = new UIContainerRectShape(stackContainer)
panel2.id = 'testContainerRect2'
panel2.color = Color3.Red()
panel2.width = '200px'
panel2.height = '200px'
