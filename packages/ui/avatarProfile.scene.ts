import { Entity, engine, OnClick, executeTask, Vector2, Color3 } from 'decentraland-ecs/src'
import {
  UIImageShape,
  UIContainerRectShape,
  UITextShape,
  UIFullScreenShape,
  UIShape
} from 'decentraland-ecs/src/decentraland/UIShapes'
import { DecentralandInterface, IEvents } from 'decentraland-ecs/src/decentraland/Types'
import { ShowProfileMessage } from 'shared/comms/types'

declare var dcl: DecentralandInterface
declare var require: any

const ATLAS_PATH = require('../../static/images/profile-ui.png')

type IState = {
  publicKey: string
  visible: boolean
  isMuted: boolean
  isBlocked: boolean
  avatarUrl: string
}

const internalState: IState = {
  publicKey: '',
  visible: false,
  isMuted: false,
  isBlocked: false,
  avatarUrl: ''
}

// -----------------------------

function createAvatar(parent: UIShape) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'avatar'
  component.width = 128
  component.height = 128
  component.source = ATLAS_PATH
  component.sourceLeft = 0
  component.sourceTop = 0
  component.sourceWidth = 128
  component.sourceHeight = 128
  component.position = new Vector2(0, 85)
  component.visible = true

  return { component }
}

function createWinkButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'wink'
  component.width = 48
  component.height = 48
  component.source = ATLAS_PATH
  component.sourceLeft = 347
  component.sourceTop = 132
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)
  return { component, entity }
}

function createFriendButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'friend'
  component.width = 48
  component.height = 48
  component.source = ATLAS_PATH
  component.sourceLeft = 396
  component.sourceTop = 132
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.position = new Vector2(55, 0)
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)
  return { component, entity }
}

function createMuteButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'mute'
  component.width = 52
  component.height = 48
  component.source = ATLAS_PATH
  component.sourceLeft = 347
  component.sourceTop = 181
  component.sourceWidth = 52
  component.sourceHeight = 48
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)
  return { component, entity }
}

function createBlockButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'block'
  component.width = 52
  component.height = 48
  component.source = ATLAS_PATH
  component.sourceLeft = 400
  component.sourceTop = 181
  component.sourceWidth = 52
  component.sourceHeight = 48
  component.position = new Vector2(55, 0)
  component.isPointerBlocker = true

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)
  return { component, entity }
}

function createCloseButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'close'
  component.width = 48
  component.height = 48
  component.source = ATLAS_PATH
  component.sourceLeft = 350
  component.sourceTop = 278
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.position = new Vector2(130, 170)
  component.isPointerBlocker = true
  component.visible = false

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { component, entity }
}

const hide = () => {
  dcl.log('hiding avatar-profile')
  internalState.visible = false
  closeButton.component.visible = false
  guiContainerComponent.visible = false
}

const toggleMute = async () => {
  const isMuted = !internalState.isMuted
  internalState.isMuted = isMuted
  muteButton.component.sourceTop = isMuted ? 230 : 181

  if (isMuted) {
    await execute('SocialController', 'mute', [internalState.publicKey])
  } else {
    await execute('SocialController', 'unmute', [internalState.publicKey])
  }
}

const toggleBlock = async () => {
  const isBlocked = !internalState.isBlocked
  internalState.isBlocked = isBlocked
  blockButton.component.sourceTop = isBlocked ? 230 : 181

  if (isBlocked) {
    await execute('SocialController', 'block', [internalState.publicKey])
  } else {
    await execute('SocialController', 'unblock', [internalState.publicKey])
  }
}

// -----------------------------------------

dcl.subscribe('SHOW_PROFILE')
dcl.subscribe('HIDE_PROFILE')
dcl.onEvent(event => {
  const eventType: string = event.type
  const eventData: any = event.data

  switch (eventType) {
    case 'SHOW_PROFILE':
      show(eventData)
      break

    case 'HIDE_PROFILE':
      hide()
      break

    default:
      break
  }
})

// ScreenSpace UI
const screenSpaceUI = new UIFullScreenShape()

// Main container
const guiContainerComponent = new UIContainerRectShape(screenSpaceUI)
// a guiContainerComponent.sizeInPixels = true
guiContainerComponent.width = 300
guiContainerComponent.height = 400
guiContainerComponent.hAlign = 'right'
// a guiContainerComponent.cornerRadius = 40
guiContainerComponent.color = Color3.White()
guiContainerComponent.position.x = -0.3
guiContainerComponent.visible = false

// background
const bgComponent = new UIImageShape(guiContainerComponent, ATLAS_PATH)
bgComponent.id = 'avatar_bg'
bgComponent.width = 96
bgComponent.height = 96
bgComponent.source = ATLAS_PATH
bgComponent.sourceLeft = 347
bgComponent.sourceTop = 1
bgComponent.sourceWidth = 96
bgComponent.sourceHeight = 96
bgComponent.position = new Vector2(0, 80)

let avatarIcon = createAvatar(guiContainerComponent)

// Display name
const displayNameComponent = new UITextShape(guiContainerComponent)
displayNameComponent.color = '#000'
displayNameComponent.fontSize = 24

const publicKeyComponent = new UITextShape(guiContainerComponent)
publicKeyComponent.color = '#999'
publicKeyComponent.fontSize = 18
publicKeyComponent.top = '30px'

// Friend, follow etc..
const friendshipsContainer = new UIContainerRectShape(guiContainerComponent)
// a friendshipsContainer.sizeInPixels = true
friendshipsContainer.width = 450
friendshipsContainer.position.y = -0.15
friendshipsContainer.position.x = -0.1

createWinkButton(friendshipsContainer, follow)
createFriendButton(friendshipsContainer, addFriend)

// Block, mute, etc...
const blockAndMuteContainer = new UIContainerRectShape(friendshipsContainer)
blockAndMuteContainer.position.x = 0.1

let muteButton = createMuteButton(blockAndMuteContainer, toggleMute)
let blockButton = createBlockButton(blockAndMuteContainer, toggleBlock)

// Close button
let closeButton = createCloseButton(guiContainerComponent, hide)

const show = (data: ShowProfileMessage) => {
  internalState.visible = true
  closeButton.component.visible = true
  guiContainerComponent.visible = true

  data.avatarUrl && setAvatarIcon(data.avatarUrl)

  internalState.publicKey = data.publicKey

  const pubKeyShortened =
    data.publicKey.substring(0, 6) + '...' + data.publicKey.substring(data.publicKey.length - 6, data.publicKey.length)

  displayNameComponent.value = data.displayName
  publicKeyComponent.value = pubKeyShortened

  internalState.isMuted = data.isMuted
  muteButton.component.sourceTop = data.isMuted ? 230 : 181

  internalState.isBlocked = data.isBlocked
  blockButton.component.sourceTop = data.isBlocked ? 230 : 181
}

function follow() {
  // stub
}

function addFriend() {
  // stub
}

async function execute(controller: string, method: string, args: Array<any>) {
  return executeTask(async () => {
    return dcl.callRpc(controller, method, args)
  })
}

const setAvatarIcon = (url: string) => {
  avatarIcon.component.source = url
}

// ------------------------------------

// Initialize avatar profile scene

executeTask(async () => {
  await dcl.loadModule('@decentraland/SocialController')
})
