const SEND_ICON = './images/send-icon.png'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = Color3.Green()
container.sizeInPixels = false
container.width = 0.5
container.height = 0.5

const innerPanelTopLeft = new UIContainerRectShape(container)
innerPanelTopLeft.id = 'innerPanelTopLeft'
innerPanelTopLeft.color = Color3.Red()
innerPanelTopLeft.sizeInPixels = false
innerPanelTopLeft.width = 0.25
innerPanelTopLeft.height = 0.25
innerPanelTopLeft.vAlign = 'top'
innerPanelTopLeft.hAlign = 'left'

const innerPanelCenterLeft = new UIContainerRectShape(container)
innerPanelCenterLeft.id = 'innerPanelCenterLeft'
innerPanelCenterLeft.color = Color3.Red()
innerPanelCenterLeft.sizeInPixels = false
innerPanelCenterLeft.width = 0.25
innerPanelCenterLeft.height = 0.25
innerPanelCenterLeft.hAlign = 'left'

const innerPanelBottomLeft = new UIContainerRectShape(container)
innerPanelBottomLeft.id = 'innerPanelBottomLeft'
innerPanelBottomLeft.color = Color3.Red()
innerPanelBottomLeft.sizeInPixels = false
innerPanelBottomLeft.width = 0.25
innerPanelBottomLeft.height = 0.25
innerPanelBottomLeft.vAlign = 'bottom'
innerPanelBottomLeft.hAlign = 'left'

const innerPanelTopCenter = new UIContainerRectShape(container)
innerPanelTopCenter.id = 'innerPanelTopCenter'
innerPanelTopCenter.color = Color3.Red()
innerPanelTopCenter.sizeInPixels = false
innerPanelTopCenter.width = 0.25
innerPanelTopCenter.height = 0.25
innerPanelTopCenter.vAlign = 'top'

const innerPanelCenterCenter = new UIContainerRectShape(container)
innerPanelCenterCenter.id = 'innerPanelCenterCenter'
innerPanelCenterCenter.color = Color3.Red()
innerPanelCenterCenter.sizeInPixels = false
innerPanelCenterCenter.width = 0.25
innerPanelCenterCenter.height = 0.25

const innerPanelBottomCenter = new UIContainerRectShape(container)
innerPanelBottomCenter.id = 'innerPanelBottomCenter'
innerPanelBottomCenter.color = Color3.Red()
innerPanelBottomCenter.sizeInPixels = false
innerPanelBottomCenter.width = 0.25
innerPanelBottomCenter.height = 0.25
innerPanelBottomCenter.vAlign = 'bottom'

const innerPanelTopRight = new UIContainerRectShape(container)
innerPanelTopRight.id = 'innerPanelTopRight'
innerPanelTopRight.color = Color3.Red()
innerPanelTopRight.sizeInPixels = false
innerPanelTopRight.width = 0.25
innerPanelTopRight.height = 0.25
innerPanelTopRight.vAlign = 'top'
innerPanelTopRight.hAlign = 'right'

const innerPanelCenterRight = new UIContainerRectShape(container)
innerPanelCenterRight.id = 'innerPanelCenterRight'
innerPanelCenterRight.color = Color3.Red()
innerPanelCenterRight.sizeInPixels = false
innerPanelCenterRight.width = 0.25
innerPanelCenterRight.height = 0.25
innerPanelCenterRight.hAlign = 'right'

const innerPanelBottomRight = new UIContainerRectShape(container)
innerPanelBottomRight.id = 'innerPanelBottomRight'
innerPanelBottomRight.color = Color3.Red()
innerPanelBottomRight.sizeInPixels = false
innerPanelBottomRight.width = 0.25
innerPanelBottomRight.height = 0.25
innerPanelBottomRight.vAlign = 'bottom'
innerPanelBottomRight.hAlign = 'right'

const innerPanel1 = new UIContainerRectShape(container)
innerPanel1.id = 'innerPanel1'
innerPanel1.color = Color3.Blue()
innerPanel1.sizeInPixels = true
innerPanel1.width = 50
innerPanel1.height = 50
innerPanel1.position = new Vector2(-0.2, 0.2)
