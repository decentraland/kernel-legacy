import {
  UIScreenSpaceShape,
  Color4,
  UIContainerStackShape,
  UIContainerRectShape,
  UIStackOrientation,
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
image.positionX = 20

const panel2 = new UIContainerStackShape(stackContainer)

panel2.stackOrientation = UIStackOrientation.HORIZONTAL
panel2.positionX = 20
panel2.positionY = 20

panel2.name = 'testContainerRect2'
panel2.color = Color4.Red()
panel2.width = '200px'
panel2.height = '200px'

const panel21 = new UIContainerRectShape(panel2)
panel21.name = 'testContainerRect1'
panel21.color = Color4.Blue()
panel21.width = '200px'
panel21.height = '200px'
panel21.positionY = 0

const panel22 = new UIContainerRectShape(panel2)
panel22.name = 'testContainerRect2'
panel22.color = Color4.Magenta()
panel22.width = '200px'
panel22.height = '200px'
panel22.positionY = 10

const panel23 = new UIContainerRectShape(panel2)
panel23.name = 'testContainerRect2'
panel23.color = Color4.Yellow()
panel23.width = '200px'
panel23.height = '200px'
panel23.positionY = 20
