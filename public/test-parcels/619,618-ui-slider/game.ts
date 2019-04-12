import { UIScreenSpaceShape, Color3, UIInputTextShape, OnTextSubmit, UISliderShape, Color4, UITextShape, UIContainerRectShape } from 'decentraland-ecs/src'

const ui = new UIScreenSpaceShape()

const container = new UISliderShape(ui)
container.width = '50%'
container.height = '50%'
container.backgroundColor = Color4.Gray()
container.isVertical = true

const rt = new UIContainerRectShape(ui)
rt.width = '50%'
rt.height = '50%'
rt.color = Color4.Clear()
rt.isPointerBlocker = false

let curOffset = 0


const textInput = new UIInputTextShape(rt)
textInput.width = '80%'
textInput.height = '25px'
textInput.vAlign = 'bottom'
textInput.hAlign = 'center'
textInput.fontSize = 10
textInput.placeholder = 'You have something to say?'
textInput.placeholderColor = Color4.Gray()
textInput.positionX = '25px'
textInput.positionY = '25px'
textInput.isPointerBlocker = true

textInput.onTextSubmitEvent = new OnTextSubmit((x) => {
    const text = new UITextShape(container)
    text.value = "<xXx-EL-CAPO-BRAYAN-xXx> " + x.text
    text.width = '100%'
    text.height = '20px'
    text.vAlign = 'top'
    text.hAlign = 'left'
    text.positionY = curOffset
    container.valueY = 1
    curOffset -= 25
})