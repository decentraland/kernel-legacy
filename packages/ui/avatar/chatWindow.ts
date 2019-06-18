import { DecentralandInterface } from 'decentraland-ecs/src/decentraland/Types'
import { Color4 } from 'decentraland-ecs/src'
import { OnTextSubmit, OnBlur, OnFocus, OnEnter } from 'decentraland-ecs/src/decentraland/UIEvents'

import {
  UIInputText,
  UIText,
  UIContainerStack,
  UIContainerRect,
  UIShape,
  UIScrollRect
} from 'decentraland-ecs/src/decentraland/UIShapes'

import { MessageEntry } from 'shared/types'

import { execute } from './rpc'
import { screenSpaceUI } from './ui'

declare var dcl: DecentralandInterface

const INITIAL_INPUT_TEXT_COLOR = Color4.Gray()
const PRIMARY_TEXT_COLOR = Color4.White()
const COMMAND_COLOR = Color4.FromHexString('#ffd7a9ff')

// UI creators -------------------
dcl.subscribe('MESSAGE_RECEIVED')
dcl.subscribe('MESSAGE_SENT')
dcl.onEvent(event => {
  const eventType: string = event.type
  const eventData: any = event.data
  if (eventType === 'MESSAGE_RECEIVED' || eventType === 'MESSAGE_SENT') {
    addMessage(eventData.messageEntry as MessageEntry)
  }
})

function createLogMessage(parent: UIShape, props: { sender: string; message: string; isCommand?: boolean }) {
  const { sender, message, isCommand } = props
  const color = isCommand ? COMMAND_COLOR : PRIMARY_TEXT_COLOR

  const messageText = new UIText(parent)
  messageText.color = color
  messageText.value = `<b>${sender}:</b> ${message}`
  messageText.fontSize = 12
  messageText.vAlign = 'top'
  messageText.hAlign = 'left'
  messageText.vTextAlign = 'top'
  messageText.hTextAlign = 'left'
  messageText.width = '350px'
  messageText.adaptWidth = false
  messageText.adaptHeight = true
  messageText.textWrapping = true
  messageText.outlineColor = Color4.Black()

  messagesLogScrollContainer.valueY = 0

  return { component: messageText }
}

// -------------------------------
const internalState = {
  commandsList: [] as Array<any>,
  messages: [] as Array<any>,
  isFocused: false,
  isSliderVisible: false
}

let isMaximized: boolean = false

const chatContainer = new UIContainerRect(screenSpaceUI)
chatContainer.name = 'chat-container'
chatContainer.color = Color4.Clear()
chatContainer.vAlign = 'bottom'
chatContainer.hAlign = 'left'
chatContainer.width = 400
chatContainer.height = 320
chatContainer.positionX = 20
chatContainer.positionY = 0
chatContainer.thickness = 0

const messagesLogScrollContainer = new UIScrollRect(chatContainer)
messagesLogScrollContainer.name = 'messages-log-scroll-container'
messagesLogScrollContainer.vAlign = 'top'
messagesLogScrollContainer.hAlign = 'center'
messagesLogScrollContainer.width = '100%'
messagesLogScrollContainer.height = '250px'
messagesLogScrollContainer.positionY = '-10px'
messagesLogScrollContainer.valueY = 1
messagesLogScrollContainer.isVertical = false
messagesLogScrollContainer.isHorizontal = false
messagesLogScrollContainer.visible = true

const messagesLogStackContainer = new UIContainerStack(messagesLogScrollContainer)
messagesLogStackContainer.name = 'messages-log-stack-container'
messagesLogStackContainer.vAlign = 'bottom'
messagesLogStackContainer.hAlign = 'center'
// messagesLogStackContainer.adaptHeight = true
// messagesLogStackContainer.adaptWidth = false
messagesLogStackContainer.width = '90%'
messagesLogStackContainer.height = '100%'
messagesLogStackContainer.spacing = 10
messagesLogStackContainer.positionX = '-10px'

const textInput = new UIInputText(chatContainer)
textInput.name = 'input'
textInput.autoStretchWidth = false
textInput.color = INITIAL_INPUT_TEXT_COLOR
textInput.background = Color4.Clear()
textInput.focusedBackground = Color4.Clear()
textInput.placeholder = 'Write a message...'
textInput.fontSize = 13
textInput.width = '90%'
textInput.height = 25
textInput.thickness = 0
textInput.vAlign = 'bottom'
textInput.hAlign = 'center'
textInput.positionY = 20
textInput.positionX = '-5px'
textInput.vTextAlign = 'center'
textInput.hTextAlign = 'left'
textInput.value = ''
textInput.textWrapping = true
textInput.isPointerBlocker = true
textInput.onFocus = new OnFocus(onInputFocus)
textInput.onBlur = new OnBlur(onInputBlur)
textInput.onTextSubmit = new OnTextSubmit(onInputSubmit)
textInput.onEnter = new OnEnter(() => setMaximized(true))

const textInputUnderLine = new UIContainerRect(textInput)
textInputUnderLine.color = Color4.Gray()
textInputUnderLine.width = '98%'
textInputUnderLine.height = 1
textInputUnderLine.vAlign = 'bottom'
textInputUnderLine.hAlign = 'left'

setMaximized(isMaximized)

export async function initializeChat() {
  const chatCmds = await execute('ChatController', 'getChatCommands', [null])
  const commandsList = []

  for (let i in chatCmds) {
    commandsList.push(chatCmds[i])
  }
}

/* function toggleChat() {
  setMaximized(!isMaximized)
} */

function setMaximized(newMaximizedValue: boolean) {
  if (newMaximizedValue) {
    if (!isMaximized) {
      textInput.value = ''

      chatContainer.color = new Color4(0, 0, 0, 0.2)
    }
  } else if (isMaximized) {
    chatContainer.color = Color4.Clear()
  }

  isMaximized = newMaximizedValue

  messagesLogScrollContainer.isVertical = isMaximized
}

function onInputFocus() {
  setMaximized(true)
}

function onInputBlur() {
  setMaximized(false)
}

async function onInputSubmit(e: { text: string }) {
  await sendMsg(e.text)
}

async function sendMsg(messageToSend: string) {
  if (messageToSend) {
    const message = await execute('ChatController', 'send', [messageToSend])

    if (message) {
      addMessage(message)
    }
  }
}

function addMessage(messageEntry: MessageEntry): void {
  internalState.messages.push(messageEntry)
  createLogMessage(messagesLogStackContainer, messageEntry)
}
