const SEND_ICON = './images/send-icon.png'

const ui = new UIScreenSpaceShape()

const container = new UIContainerRectShape(ui)
container.id = 'testRectContainer'
container.color = new Color4(0, 255, 0, 255)
container.sizeInPixels = false
container.width = 0.5
container.height = 0.5

const innerPanelTopLeft = new UIContainerRectShape(container)
innerPanelTopLeft.id = 'innerPanelTopLeft'
innerPanelTopLeft.color = new Color4(255, 0, 0, 255)
innerPanelTopLeft.sizeInPixels = false
innerPanelTopLeft.width = 0.25
innerPanelTopLeft.height = 0.25
innerPanelTopLeft.vAlign = 'top'
innerPanelTopLeft.hAlign = 'left'

const innerPanelCenterLeft = new UIContainerRectShape(container)
innerPanelCenterLeft.id = 'innerPanelCenterLeft'
innerPanelCenterLeft.color = new Color4(255, 0, 0, 255)
innerPanelCenterLeft.sizeInPixels = false
innerPanelCenterLeft.width = 0.25
innerPanelCenterLeft.height = 0.25
innerPanelCenterLeft.hAlign = 'left'

const innerPanelBottomLeft = new UIContainerRectShape(container)
innerPanelBottomLeft.id = 'innerPanelBottomLeft'
innerPanelBottomLeft.color = new Color4(255, 0, 0, 255)
innerPanelBottomLeft.sizeInPixels = false
innerPanelBottomLeft.width = 0.25
innerPanelBottomLeft.height = 0.25
innerPanelBottomLeft.vAlign = 'bottom'
innerPanelBottomLeft.hAlign = 'left'

const innerPanelTopCenter = new UIContainerRectShape(container)
innerPanelTopCenter.id = 'innerPanelTopCenter'
innerPanelTopCenter.color = new Color4(255, 0, 0, 255)
innerPanelTopCenter.sizeInPixels = false
innerPanelTopCenter.width = 0.25
innerPanelTopCenter.height = 0.25
innerPanelTopCenter.vAlign = 'top'

const innerPanelCenterCenter = new UIContainerRectShape(container)
innerPanelCenterCenter.id = 'innerPanelCenterCenter'
innerPanelCenterCenter.color = new Color4(255, 0, 0, 255)
innerPanelCenterCenter.sizeInPixels = false
innerPanelCenterCenter.width = 0.25
innerPanelCenterCenter.height = 0.25

const innerPanelBottomCenter = new UIContainerRectShape(container)
innerPanelBottomCenter.id = 'innerPanelBottomCenter'
innerPanelBottomCenter.color = new Color4(255, 0, 0, 255)
innerPanelBottomCenter.sizeInPixels = false
innerPanelBottomCenter.width = 0.25
innerPanelBottomCenter.height = 0.25
innerPanelBottomCenter.vAlign = 'bottom'

const innerPanelTopRight = new UIContainerRectShape(container)
innerPanelTopRight.id = 'innerPanelTopRight'
innerPanelTopRight.color = new Color4(255, 0, 0, 255)
innerPanelTopRight.sizeInPixels = false
innerPanelTopRight.width = 0.25
innerPanelTopRight.height = 0.25
innerPanelTopRight.vAlign = 'top'
innerPanelTopRight.hAlign = 'right'

const innerPanelCenterRight = new UIContainerRectShape(container)
innerPanelCenterRight.id = 'innerPanelCenterRight'
innerPanelCenterRight.color = new Color4(255, 0, 0, 255)
innerPanelCenterRight.sizeInPixels = false
innerPanelCenterRight.width = 0.25
innerPanelCenterRight.height = 0.25
innerPanelCenterRight.hAlign = 'right'

const innerPanelBottomRight = new UIContainerRectShape(container)
innerPanelBottomRight.id = 'innerPanelBottomRight'
innerPanelBottomRight.color = new Color4(255, 0, 0, 255)
innerPanelBottomRight.sizeInPixels = false
innerPanelBottomRight.width = 0.25
innerPanelBottomRight.height = 0.25
innerPanelBottomRight.vAlign = 'bottom'
innerPanelBottomRight.hAlign = 'right'

const innerPanel1 = new UIContainerRectShape(container)
innerPanel1.id = 'innerPanel1'
innerPanel1.color = new Color4(0, 0, 255, 255)
innerPanel1.sizeInPixels = true
innerPanel1.width = 50
innerPanel1.height = 50
innerPanel1.position = new Vector2(-0.2, 0.2)
