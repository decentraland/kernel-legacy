import { DecentralandInterface, IEvents } from 'decentraland-ecs/src/decentraland/Types'
import { Entity, engine, OnChanged, OnClick, executeTask, Color3 } from 'decentraland-ecs/src'
import {
  UIImageShape,
  UIInputTextShape,
  UITextShape,
  UIContainerStackShape,
  UISliderShape,
  UIContainerRectShape,
  UIFullScreenShape,
  UIShape
} from 'decentraland-ecs/src/decentraland/UIShapes'

declare var dcl: DecentralandInterface
declare var require: any

const UI_CHAT = require('../../static/images/ui-chat.png')

// ScreenSpace UI
const parent = new UIFullScreenShape()

const MAX_CHARS = 94
const PRIMARY_TEXT_COLOR = Color3.White()
const COMMAND_COLOR = Color3.FromHexString('#d7a9ff')

type MessageEntry = {
  id?: string
  sender: string
  message: string
  isCommand?: boolean
}

// UI creators -------------------

function createMinimizeButton(parent: UIShape, click: (ev: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, UI_CHAT)
  component.id = 'minimize-icon'
  component.width = 20
  component.height = 20
  component.source = UI_CHAT
  component.sourceWidth = 40
  component.sourceHeight = 40
  component.sourceTop = 10
  component.sourceLeft = 130
  component.hAlign = 'right'
  component.positionX = '-10px'
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { entity, component }
}

function createSendButton(parent: UIShape, click: (ev: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, UI_CHAT)
  component.id = 'send-icon'
  component.width = 23
  component.height = 23
  component.source = UI_CHAT
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.sourceTop = 0
  component.sourceLeft = 48
  component.hAlign = 'right'
  component.positionX = '-10px'
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { entity, component }
}

function createHelpButton(parent: UIShape, click: (ev: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, UI_CHAT)
  component.id = 'help-icon'
  component.width = 23
  component.height = 23
  component.source = UI_CHAT
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.sourceTop = 0
  component.sourceLeft = 0
  component.hAlign = 'right'
  component.positionX = '-10px'
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { entity, component }
}

function createCloseButton(parent: UIShape, click: (ev: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, UI_CHAT)
  component.id = 'close-icon'
  component.width = 20
  component.height = 20
  component.source = UI_CHAT
  component.sourceWidth = 35
  component.sourceHeight = 35
  component.sourceTop = 5
  component.sourceLeft = 96
  component.hAlign = 'right'
  component.positionX = '-10px'
  component.isPointerBlocker = true
  component.visible = false

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { entity, component }
}

function createHelpCloseButton(parent: UIShape, click: (data: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, UI_CHAT)
  component.id = 'help-close-icon'
  component.width = 25
  component.height = 25
  component.source = UI_CHAT
  component.sourceWidth = 59
  component.sourceHeight = 60
  component.sourceTop = -5
  component.sourceLeft = 75
  component.hAlign = 'right'
  component.positionX = '-10px'
  component.positionY = '5px'
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { entity, component }
}

function createTextInput(parent: UIShape, changed: (ev: IEvents['onChange']) => void) {
  const component = new UIInputTextShape(parent)
  component.id = 'input'
  component.autoStretchWidth = false
  component.color = PRIMARY_TEXT_COLOR
  component.background = Color3.Black()
  component.focusedBackground = Color3.Black()
  component.placeholder = 'Type a message...'
  component.fontSize = 15
  component.width = 400
  component.height = 40
  component.thickness = 0
  component.vAlign = 'bottom'
  component.hAlign = 'left'
  component.positionX = '5px'
  component.value = ''
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnChanged(changed))
  engine.addEntity(entity)

  return { component }
}

function renderSender(parent: UIShape, props: { color: Color3; sender: string }) {
  const component = new UITextShape(parent)
  component.color = props.color
  component.value = `${props.sender}: `
  component.fontSize = 14
  component.fontWeight = 'bold'
  component.hTextAlign = 'left'
  component.vTextAlign = 'top'
  component.hAlign = 'left'
  component.vAlign = 'top'
  component.resizeToFit = true

  return { component }
}

function renderMessage(parent: UIShape, props: { color: Color3; message: string }) {
  const component = new UITextShape(parent)
  component.width = 320
  component.color = props.color
  component.value = props.message
  component.fontSize = 14
  component.positionX = '10px'
  component.height = 30
  component.vTextAlign = 'top'
  component.hTextAlign = 'left'
  component.textWrapping = true

  return { component }
}

function createMessage(parent: UIShape, props: { sender: string; message: string; isCommand?: boolean }) {
  const { sender, message, isCommand } = props
  const color = isCommand ? COMMAND_COLOR : PRIMARY_TEXT_COLOR

  const stack = new UIContainerStackShape(parent)
  stack.vertical = false
  stack.hAlign = 'left'
  stack.vAlign = 'bottom'
  stack.height = 30
  stack.width = 400
  stack.positionY = '50px'

  renderSender(stack, { color, sender })
  renderMessage(stack, { color, message })

  return { component: stack }
}

function createMessagesScrollbar(parent: UIShape, changed: (ev: IEvents['onChange']) => void) {
  const component = new UISliderShape(parent)
  component.id = 'slider'
  component.height = 170
  component.width = 20
  component.positionX = '185px'
  component.minimum = -45
  component.isVertical = true
  component.maximum = -45
  component.value = -45
  component.paddingLeft = 0
  component.visible = false
  component.isThumbCircle = true
  component.thumbWidth = 15
  component.barOffset = 8
  component.color = Color3.FromHexString('#333333')
  component.background = Color3.FromHexString('#262626')
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnChanged(changed))
  engine.addEntity(entity)

  return { entity, component }
}

function createChatHeader(parent: UIShape) {
  const container = new UIContainerRectShape(parent)
  container.id = 'gui-container-header'
  container.vAlign = 'top'
  container.hAlign = 'left'
  container.width = 400
  container.height = 45
  container.thickness = 0
  container.color = Color3.Black()

  const headerTextComponent = new UITextShape(parent)
  headerTextComponent.color = PRIMARY_TEXT_COLOR
  headerTextComponent.value = 'Chat'
  headerTextComponent.fontSize = 17
  headerTextComponent.hAlign = 'left'
  headerTextComponent.vAlign = 'top'
  headerTextComponent.hTextAlign = 'left'
  headerTextComponent.vTextAlign = 'top'
  headerTextComponent.positionX = '15px'
  headerTextComponent.positionY = '15px'
  headerTextComponent.width = 100
  headerTextComponent.height = 40

  return { container, headerTextComponent }
}

function createCommandHelper(parent: UIShape, props: { name: string; description: string }) {
  const container = new UIContainerStackShape(parent)
  container.height = 55

  const cmdNameComponent = new UITextShape(container)
  // cmdNameComponent.color = COMMAND_COLOR
  cmdNameComponent.value = `/${props.name}`
  cmdNameComponent.fontSize = 14
  cmdNameComponent.fontWeight = 'bold'
  cmdNameComponent.width = '100%'
  cmdNameComponent.height = '25px'

  cmdNameComponent.hTextAlign = 'left'

  const cmdDescriptionComponent = new UITextShape(container)
  cmdDescriptionComponent.color = Color3.FromHexString('#7d8499')
  cmdDescriptionComponent.value = props.description
  cmdDescriptionComponent.fontSize = 13
  cmdDescriptionComponent.textWrapping = true
  cmdDescriptionComponent.width = '100%'
  cmdDescriptionComponent.height = '30px'
  cmdDescriptionComponent.vTextAlign = 'top'
  cmdDescriptionComponent.hTextAlign = 'left'
}

// -------------------------------
const messageHeight: number = 30
const internalState = {
  commandsList: [] as Array<any>,
  messages: [] as Array<any>,
  isFocused: false,
  sliderMin: -45,
  sliderMax: -45,
  isSliderVisible: false,
  sliderValue: -45,
  helpPanelTop: 50,
  isHelpVisible: false,
  rotate: false
}

dcl.subscribe('MESSAGE_RECEIVED')
dcl.subscribe('MESSAGE_SENT')
dcl.onEvent(event => {
  const eventType: string = event.type
  const eventData: any = event.data
  if (eventType === 'MESSAGE_RECEIVED' || eventType === 'MESSAGE_SENT') {
    addMessage(eventData.messageEntry)
  }
})

const containerMinimized = initializeMinimizedChat(parent)

function openHelp() {
  internalState.isHelpVisible = true

  container!.visible = false
  containerMinimized!.visible = false
  helpContainer!.visible = true
}

function closeHelp() {
  internalState.isHelpVisible = false

  container!.visible = true
  containerMinimized!.visible = false
  helpContainer!.visible = false
}

function toggleChat() {
  const visible = container!.visible

  container!.visible = !visible
  containerMinimized!.visible = visible
}

function onSliderChanged(data: any) {
  const value = Math.round(data.value)
  sliderOpenedChat.component.value = value

  //messageContainer!.top = `${value}px`
  messageContainer!.positionY = value
}

function onHelpSliderChanged(data: any) {
  const value = Math.round(data.value)
  helpSliderComponent.value = value
  //commandsContainerStack.position.y = `${-value}px`
  commandsContainerStack.positionY = -value
}

function onInputChanged(data: any) {
  const { value } = textInput.component

  // set proper color
  if (value.charAt(0) === '/') {
    textInput.component.color = COMMAND_COLOR
  } else {
    textInput.component.color = PRIMARY_TEXT_COLOR
  }

  if (value.length < MAX_CHARS) {
    textInput.component.value = data.value
  } else {
    textInput.component.value = data.value.slice(0, MAX_CHARS)
  }
}

async function sendMsg() {
  const currentMessage = textInput.component.value

  if (currentMessage) {
    const cmd = await execute('ChatController', 'send', [currentMessage])
    // If the command was recognized, add the confirming message to the list
    if (cmd) {
      addMessage(cmd as MessageEntry)
    }

    // Clear input
    textInput.component.value = ''
  }
}

function addMessage(messageEntry: MessageEntry): void {
  if (internalState.messages.length <= 6) {
    internalState.messages.push(messageEntry)
    if (internalState.messages.length > 0) {
      addEntryAndResize(messageEntry)
    }
  } else {
    internalState.messages = [...internalState.messages, messageEntry]
    sliderOpenedChat.component.maximum = getMessagesListHeight() - 160 // makes it always scroll to latest msg
    sliderOpenedChat.component.value = -45
    sliderOpenedChat.component.visible = true
    addEntryAndResize(messageEntry)
  }
}

function addEntryAndResize(messageEntry: MessageEntry) {
  //messageContainer!.height = `${getMessagesListHeight()}px`
  messageContainer!.height = getMessagesListHeight()
  createMessage(messageContainer, messageEntry)
}

const container = new UIContainerRectShape(parent)
container.id = 'gui-container'
container.vAlign = 'bottom'
container.hAlign = 'left'
container.width = 400
container.height = 250
container.positionX = 20
container.positionY = 20
container.thickness = 0
container.color = Color3.Black()
container.visible = false

const messageContainer = new UIContainerStackShape(container)
messageContainer.vAlign = 'bottom'
messageContainer.hAlign = 'left'
messageContainer.positionY = '-105px'
messageContainer.positionX = '15px'
messageContainer.height = '200px'

const footerContainer = new UIContainerRectShape(container)
footerContainer.adaptHeight = true
footerContainer.adaptWidth = true
footerContainer.vAlign = 'bottom'
footerContainer.hAlign = 'left'

const textInput = createTextInput(footerContainer, onInputChanged)

createHelpButton(footerContainer, openHelp)
createSendButton(footerContainer, sendMsg)
createCloseButton(footerContainer, toggleChat)

// Slider for opened chat
const sliderOpenedChat = createMessagesScrollbar(container, onSliderChanged)

// Chat header text
const chatHeader = createChatHeader(container)
createMinimizeButton(chatHeader.container, toggleChat)

function initializeMinimizedChat(parent: UIFullScreenShape) {
  const containerMinimized = new UIContainerRectShape(parent)
  containerMinimized.id = 'gui-container-minimized'
  containerMinimized.adaptHeight = true
  containerMinimized.adaptWidth = true
  containerMinimized.vAlign = 'bottom'
  containerMinimized.hAlign = 'left'
  containerMinimized.positionX = 20
  containerMinimized.positionY = 15
  containerMinimized.thickness = 0
  containerMinimized.color = Color3.Black()

  const minimizedIcon = new UIImageShape(containerMinimized, UI_CHAT)
  minimizedIcon.id = 'minimize-icon'
  minimizedIcon.width = 230
  minimizedIcon.height = 55
  minimizedIcon.source = UI_CHAT
  minimizedIcon.sourceWidth = 210
  minimizedIcon.sourceHeight = 50
  minimizedIcon.sourceTop = 50
  minimizedIcon.sourceLeft = 0
  minimizedIcon.hAlign = 'right'
  minimizedIcon.vAlign = 'top'
  minimizedIcon.isPointerBlocker = true

  const minimizedIconEntity = new Entity()
  minimizedIconEntity.addComponentOrReplace(minimizedIcon)
  minimizedIconEntity.addComponentOrReplace(new OnClick(toggleChat))
  engine.addEntity(minimizedIconEntity)

  const helpIcon = createHelpButton(containerMinimized, openHelp)
  helpIcon.component.positionY = 5

  return containerMinimized
}

const helpContainer = new UIContainerRectShape(parent)
helpContainer.id = 'gui-container-commands'
helpContainer.vAlign = 'bottom'
helpContainer.hAlign = 'left'
helpContainer.width = 400
helpContainer.height = 250
helpContainer.positionX = 20
helpContainer.positionY = 20
helpContainer.thickness = 0
helpContainer.color = Color3.Black()
helpContainer.visible = false

const commandsContainerStack = new UIContainerStackShape(helpContainer)
commandsContainerStack.vAlign = 'top'
commandsContainerStack.hAlign = 'left'
commandsContainerStack.positionY = '50px'
commandsContainerStack.positionX = '15px'
commandsContainerStack.height = `55px`
commandsContainerStack.width = '320px'

const helpSliderComponent = new UISliderShape(helpContainer)
helpSliderComponent.id = 'help-slider'
helpSliderComponent.height = '170px'
helpSliderComponent.width = '20px'
helpSliderComponent.positionX = '185px'
helpSliderComponent.positionY = '10px'
helpSliderComponent.minimum = 0
helpSliderComponent.isVertical = true
helpSliderComponent.value = 0
helpSliderComponent.paddingLeft = 0

helpSliderComponent.height = 170
helpSliderComponent.width = 20

helpSliderComponent.swapOrientation = true
helpSliderComponent.isThumbCircle = true
helpSliderComponent.thumbWidth = 15
helpSliderComponent.barOffset = 8
helpSliderComponent.color = Color3.FromHexString('#333333')
helpSliderComponent.background = Color3.FromHexString('#262626')
helpSliderComponent.isPointerBlocker = true

const sliderEntity = new Entity()
sliderEntity.addComponentOrReplace(helpSliderComponent)
sliderEntity.addComponentOrReplace(new OnChanged(onHelpSliderChanged))
engine.addEntity(sliderEntity)

const closeButtonContainer = new UIContainerRectShape(helpContainer)
closeButtonContainer.adaptHeight = true
closeButtonContainer.adaptWidth = true
closeButtonContainer.vAlign = 'bottom'
closeButtonContainer.hAlign = 'right'

createHelpCloseButton(closeButtonContainer, closeHelp)

const headerContainer = new UIContainerRectShape(helpContainer)
headerContainer.id = 'gui-container-header'
headerContainer.vAlign = 'top'
headerContainer.hAlign = 'left'
headerContainer.width = 400
headerContainer.height = 45
headerContainer.thickness = 0
headerContainer.color = Color3.Black()

const headerTextComponent = new UITextShape(helpContainer)
headerTextComponent.color = PRIMARY_TEXT_COLOR
headerTextComponent.value = 'Commands'
headerTextComponent.fontSize = 17
headerTextComponent.hAlign = 'left'
headerTextComponent.vAlign = 'top'
headerTextComponent.hTextAlign = 'left'
headerTextComponent.vTextAlign = 'top'
headerTextComponent.positionY = '15px'
headerTextComponent.positionX = '15px'
headerTextComponent.height = 40

async function execute(controller: string, method: string, args: Array<any>) {
  return executeTask(async () => {
    return dcl.callRpc(controller, method, args)
  })
}

function getMessagesListHeight() {
  return internalState.messages.length * messageHeight
}

// ------------------------------------

// Initialize chat scene

async function initializeCommandsHelp() {
  const chatCmds = await execute('ChatController', 'getChatCommands', [null])
  const commandsList = []

  for (let i in chatCmds) {
    commandsList.push(chatCmds[i])
  }

  if (commandsList.length > 0) {
    commandsList.map(cmd => {
      createCommandHelper(commandsContainerStack, cmd)
    })
  }

  const commandHeight = 55
  const commandsListHeight = commandsList.length * commandHeight

  commandsContainerStack.height = commandsListHeight
  helpSliderComponent.maximum = commandsListHeight - commandHeight
}

executeTask(async () => {
  await Promise.all([dcl.loadModule('@decentraland/ChatController'), dcl.loadModule('@decentraland/Identity')])
  await initializeCommandsHelp()
})
