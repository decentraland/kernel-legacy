import { UIScreenSpaceShape, UIContainerRectShape, Color4 } from 'decentraland-ecs/src'

//const SEND_ICON = './images/send-icon.png'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = Color4.Green()
container.width = '50%'
container.height = '50%'

const innerPanelTopLeft = new UIContainerRectShape(container)
innerPanelTopLeft.id = 'innerPanelTopLeft'
innerPanelTopLeft.color = Color4.Red()
innerPanelTopLeft.width = '25%'
innerPanelTopLeft.height = '100px'
innerPanelTopLeft.vAlign = 'top'
innerPanelTopLeft.hAlign = 'left'

const innerPanelCenterLeft = new UIContainerRectShape(container)
innerPanelCenterLeft.id = 'innerPanelCenterLeft'
innerPanelCenterLeft.color = Color4.Red()
innerPanelCenterLeft.width = '25%'
innerPanelCenterLeft.height = '100px'
innerPanelCenterLeft.hAlign = 'left'

const innerPanelBottomLeft = new UIContainerRectShape(container)
innerPanelBottomLeft.id = 'innerPanelBottomLeft'
innerPanelBottomLeft.color = Color4.Red()
innerPanelBottomLeft.width = '25%'
innerPanelBottomLeft.height = '25%'
innerPanelBottomLeft.vAlign = 'bottom'
innerPanelBottomLeft.hAlign = 'left'

const innerPanelTopCenter = new UIContainerRectShape(container)
innerPanelTopCenter.id = 'innerPanelTopCenter'
innerPanelTopCenter.color = Color4.Red()
innerPanelTopCenter.width = '25%'
innerPanelTopCenter.height = '25%'
innerPanelTopCenter.vAlign = 'top'

const innerPanelCenterCenter = new UIContainerRectShape(container)
innerPanelCenterCenter.id = 'innerPanelCenterCenter'
innerPanelCenterCenter.color = Color4.Red()
innerPanelCenterCenter.width = '25px'
innerPanelCenterCenter.height = 25

const innerPanelBottomCenter = new UIContainerRectShape(container)
innerPanelBottomCenter.id = 'innerPanelBottomCenter'
innerPanelBottomCenter.color = Color4.Red()
innerPanelBottomCenter.width = '25%'
innerPanelBottomCenter.height = '25%'
innerPanelBottomCenter.vAlign = 'bottom'

const innerPanelTopRight = new UIContainerRectShape(container)
innerPanelTopRight.id = 'innerPanelTopRight'
innerPanelTopRight.color = Color4.Red()
innerPanelTopRight.width = 100
innerPanelTopRight.height = '25%'
innerPanelTopRight.vAlign = 'top'
innerPanelTopRight.hAlign = 'right'

const innerPanelCenterRight = new UIContainerRectShape(container)
innerPanelCenterRight.id = 'innerPanelCenterRight'
innerPanelCenterRight.color = Color4.Red()
innerPanelCenterRight.width = '25%'
innerPanelCenterRight.height = '25%'
innerPanelCenterRight.hAlign = 'right'

const innerPanelBottomRight = new UIContainerRectShape(container)
innerPanelBottomRight.id = 'innerPanelBottomRight'
innerPanelBottomRight.color = Color4.Red()
innerPanelBottomRight.width = '25%'
innerPanelBottomRight.height = '25%'
innerPanelBottomRight.vAlign = 'bottom'
innerPanelBottomRight.hAlign = 'right'

const innerPanel1 = new UIContainerRectShape(container)
innerPanel1.id = 'innerPanel1'
innerPanel1.color = Color4.Blue()
innerPanel1.width = '50%'
innerPanel1.height = '50%'
innerPanel1.positionX = '-20%'
innerPanel1.positionY = '20%'
