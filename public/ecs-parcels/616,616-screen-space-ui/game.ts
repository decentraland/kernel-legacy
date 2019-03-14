const SEND_ICON = './images/send-icon.png'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = new Color4(0, 255, 0, 255)
container.width = 0.5
container.height = 0.5

const innerPanelTopLeft = new UIContainerRectShape(container)
innerPanelTopLeft.id = 'innerPanelTopLeft'
innerPanelTopLeft.color = new Color4(255, 0, 0, 255)
innerPanelTopLeft.width = 0.25
innerPanelTopLeft.height = 0.25
innerPanelTopLeft.horizontalOffset = -0.375
innerPanelTopLeft.verticalOffset = 0.375

const innerPanelCenterLeft = new UIContainerRectShape(container)
innerPanelCenterLeft.id = 'innerPanelCenterLeft'
innerPanelCenterLeft.color = new Color4(255, 0, 0, 255)
innerPanelCenterLeft.width = 0.25
innerPanelCenterLeft.height = 0.25
innerPanelCenterLeft.horizontalOffset = -0.375

const innerPanelBottomLeft = new UIContainerRectShape(container)
innerPanelBottomLeft.id = 'innerPanelBottomLeft'
innerPanelBottomLeft.color = new Color4(255, 0, 0, 255)
innerPanelBottomLeft.width = 0.25
innerPanelBottomLeft.height = 0.25
innerPanelBottomLeft.horizontalOffset = -0.375
innerPanelBottomLeft.verticalOffset = -0.375

const innerPanelTopCenter = new UIContainerRectShape(container)
innerPanelTopCenter.id = 'innerPanelTopCenter'
innerPanelTopCenter.color = new Color4(255, 0, 0, 255)
innerPanelTopCenter.width = 0.25
innerPanelTopCenter.height = 0.25
innerPanelTopCenter.verticalOffset = 0.375

const innerPanelCenterCenter = new UIContainerRectShape(container)
innerPanelCenterCenter.id = 'innerPanelCenterCenter'
innerPanelCenterCenter.color = new Color4(255, 0, 0, 255)
innerPanelCenterCenter.width = 0.25
innerPanelCenterCenter.height = 0.25

const innerPanelBottomCenter = new UIContainerRectShape(container)
innerPanelBottomCenter.id = 'innerPanelBottomCenter'
innerPanelBottomCenter.color = new Color4(255, 0, 0, 255)
innerPanelBottomCenter.width = 0.25
innerPanelBottomCenter.height = 0.25
innerPanelBottomCenter.verticalOffset = -0.375

const innerPanelTopRight = new UIContainerRectShape(container)
innerPanelTopRight.id = 'innerPanelTopRight'
innerPanelTopRight.color = new Color4(255, 0, 0, 255)
innerPanelTopRight.width = 0.25
innerPanelTopRight.height = 0.25
innerPanelTopRight.horizontalOffset = 0.375
innerPanelTopRight.verticalOffset = 0.375

const innerPanelCenterRight = new UIContainerRectShape(container)
innerPanelCenterRight.id = 'innerPanelCenterRight'
innerPanelCenterRight.color = new Color4(255, 0, 0, 255)
innerPanelCenterRight.width = 0.25
innerPanelCenterRight.height = 0.25
innerPanelCenterRight.horizontalOffset = 0.375

const innerPanelBottomRight = new UIContainerRectShape(container)
innerPanelBottomRight.id = 'innerPanelBottomRight'
innerPanelBottomRight.color = new Color4(255, 0, 0, 255)
innerPanelBottomRight.width = 0.25
innerPanelBottomRight.height = 0.25
innerPanelBottomRight.horizontalOffset = 0.375
innerPanelBottomRight.verticalOffset = -0.375

const innerPanel1 = new UIContainerRectShape(container)
innerPanel1.id = 'innerPanel1'
innerPanel1.color = new Color4(0, 0, 255, 255)
innerPanel1.sizeInPixels = true
innerPanel1.width = 50
innerPanel1.height = 50
innerPanel1.horizontalOffset = -0.2
innerPanel1.verticalOffset = 0.2
