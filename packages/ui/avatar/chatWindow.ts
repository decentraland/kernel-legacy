import { DecentralandInterface } from 'decentraland-ecs/src/decentraland/Types'

declare var dcl: DecentralandInterface

// UI creators -------------------
dcl.subscribe('MESSAGE_RECEIVED')
dcl.subscribe('MESSAGE_SENT')
dcl.onEvent(event => {
  const eventType: string = event.type
  const eventData: any = event.data
  if (eventType === 'MESSAGE_RECEIVED' || eventType === 'MESSAGE_SENT') {
    // addMessage(eventData.messageEntry as MessageEntry)
    console.log(eventData)
  }
})
