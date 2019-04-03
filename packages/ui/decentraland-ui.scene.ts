import { executeTask } from 'decentraland-ecs/src'
import { DecentralandInterface, AVATAR_OBSERVABLE, CHAT_ACTIONS } from 'decentraland-ecs/src/decentraland/Types'
import { avatarMessageObservable } from './avatar/avatarSystem'
import { initializeChat, toggleChatAndFocus } from './avatar/chatWindow'

declare var dcl: DecentralandInterface

// Initialize avatar profile scene

executeTask(async () => {
  await Promise.all([
    dcl.loadModule('@decentraland/ChatController'),
    dcl.loadModule('@decentraland/Identity'),
    dcl.loadModule('@decentraland/SocialController')
  ])

  dcl.subscribe(AVATAR_OBSERVABLE)
  dcl.subscribe(CHAT_ACTIONS)

  dcl.onEvent(event => {
    const eventType: string = event.type

    if (eventType === AVATAR_OBSERVABLE) {
      avatarMessageObservable.notifyObservers(event.data as any)
    }

    if (eventType === CHAT_ACTIONS) {
      toggleChatAndFocus()
    }
  })

  await initializeChat()
})
