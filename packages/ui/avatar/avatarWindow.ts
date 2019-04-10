import {
  UIShape,
  UIImageShape,
  IEvents,
  Entity,
  OnClick,
  engine,
  UIContainerRectShape,
  UITextShape,
  Color3,
  Texture
} from 'decentraland-ecs/src'
import { execute } from './rpc'
import { screenSpaceUI } from './ui'

declare var require: any

const ATLAS_PATH = require('../../../static/images/profile-ui.png')

const AtlasTexture = new Texture(ATLAS_PATH)

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

export let currentAvatarId: string | null = null

// -----------------------------

function createAvatar(parent: UIShape) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'avatar'
  component.width = '128px'
  component.height = '128px'
  component.source = AtlasTexture
  component.sourceLeft = 0
  component.sourceTop = 0
  component.sourceWidth = 128
  component.sourceHeight = 128
  component.positionY = 85
  component.visible = true

  return { component }
}

function createWinkButton(parent: UIShape, click: (event: IEvents['onClick']) => void) {
  const component = new UIImageShape(parent, ATLAS_PATH)
  component.id = 'wink'
  component.width = '48px'
  component.height = '48px'
  component.source = AtlasTexture
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
  component.width = '48px'
  component.height = '48px'
  component.source = AtlasTexture
  component.sourceLeft = 396
  component.sourceTop = 132
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.positionX = 55
  component.positionY = 0
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
  component.width = '52px'
  component.height = '48px'
  component.source = AtlasTexture
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
  component.width = '52px'
  component.height = '48px'
  component.source = AtlasTexture
  component.sourceLeft = 400
  component.sourceTop = 181
  component.sourceWidth = 52
  component.sourceHeight = 48
  component.positionX = 55
  component.positionY = 0
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
  component.width = '48px'
  component.height = '48px'
  component.source = AtlasTexture
  component.sourceLeft = 350
  component.sourceTop = 278
  component.sourceWidth = 48
  component.sourceHeight = 48
  component.positionX = 130
  component.positionY = 170
  component.isPointerBlocker = true
  component.visible = false

  const entity = new Entity()
  entity.addComponentOrReplace(component)
  entity.addComponentOrReplace(new OnClick(click))
  engine.addEntity(entity)

  return { component, entity }
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

// Main container
const guiContainerComponent = new UIContainerRectShape(screenSpaceUI)
// a guiContainerComponent.sizeInPixels = true
guiContainerComponent.width = 300
guiContainerComponent.height = 400
guiContainerComponent.hAlign = 'right'
// a guiContainerComponent.cornerRadius = 40
guiContainerComponent.color = Color3.White()
guiContainerComponent.positionX = -0.3
guiContainerComponent.visible = false

// background
const bgComponent = new UIImageShape(guiContainerComponent, ATLAS_PATH)
bgComponent.id = 'avatar_bg'
bgComponent.width = '96px'
bgComponent.height = '96px'
bgComponent.source = AtlasTexture
bgComponent.sourceLeft = 347
bgComponent.sourceTop = 1
bgComponent.sourceWidth = 96
bgComponent.sourceHeight = 96
bgComponent.positionY = 80

createAvatar(guiContainerComponent)

// Display name
const displayNameComponent = new UITextShape(guiContainerComponent)
displayNameComponent.color = Color3.FromHexString('#000')
displayNameComponent.fontSize = 24

const publicKeyComponent = new UITextShape(guiContainerComponent)
publicKeyComponent.color = Color3.FromHexString('#999')
publicKeyComponent.fontSize = 18
//publicKeyComponent.top = '30px'
publicKeyComponent.positionY = 30

// Friend, follow etc..
const friendshipsContainer = new UIContainerRectShape(guiContainerComponent)
// a friendshipsContainer.sizeInPixels = true
friendshipsContainer.width = 450
friendshipsContainer.positionY = -0.15
friendshipsContainer.positionX = -0.1

createWinkButton(friendshipsContainer, follow)
createFriendButton(friendshipsContainer, addFriend)

// Block, mute, etc...
const blockAndMuteContainer = new UIContainerRectShape(friendshipsContainer)
blockAndMuteContainer.positionX = 0.1

let muteButton = createMuteButton(blockAndMuteContainer, toggleMute)
let blockButton = createBlockButton(blockAndMuteContainer, toggleBlock)

// Close button
let closeButton = createCloseButton(guiContainerComponent, hideAvatarWindow)

export type ShowProfileMessage = {
  uuid: string
  publicKey: string
  displayName: string
  isMuted: boolean
  isBlocked: boolean
  avatarUrl?: string
}

export function showAvatarWindow(data: ShowProfileMessage) {
  currentAvatarId = data.uuid

  internalState.visible = true
  closeButton.component.visible = true
  guiContainerComponent.visible = true

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

export function hideAvatarWindow() {
  internalState.visible = false
  closeButton.component.visible = false
  guiContainerComponent.visible = false
}

function follow() {
  // stub
}

function addFriend() {
  // stub
}
