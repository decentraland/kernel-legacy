import { DEBUG_ANALYTICS } from 'config'

import { chatObservable, ChatEvent } from './comms/chat'
import { avatarMessageObservable } from './comms/peers'

declare var window: any

export type SegmentEvent = {
  name: string
  data: string
}

const trackingQueue: SegmentEvent[] = []
let tracking = false

export async function initialize(
  segmentKey: string,
  { id, name, email }: { id: string; name: string; email: string }
): Promise<void> {
  if (!window.analytics) {
    return
  }

  window.analytics.load(segmentKey)
  window.analytics.page()

  return window.analytics.identify(id, {
    name,
    email
  })
}

export function queueTrackingEvent(eventName: string, eventData: any) {
  if (DEBUG_ANALYTICS) {
    console['log'](`Tracking event "${eventName}": `, eventData)
  }

  if (!window.analytics) {
    return
  }

  trackingQueue.push({ name: eventName, data: eventData })
  if (!tracking) {
    startTracking()
  }
}

function startTracking() {
  if (trackingQueue.length > 0) {
    tracking = true
    track(trackingQueue.shift()!)
  }
}

function track({ name, data }: SegmentEvent) {
  window.analytics.track(name, data, {}, () => {
    if (trackingQueue.length === 0) {
      tracking = false
      return
    }
    track(trackingQueue.shift()!)
  })
}

chatObservable.add((event: any) => {
  if (event.type === ChatEvent.MESSAGE_RECEIVED) {
    queueTrackingEvent('Chat message received', { lenght: event.data.message.lenght })
  } else if (event.type === ChatEvent.MESSAGE_SENT) {
    queueTrackingEvent('Send chat message', { messageId: event.data.messageId, length: event.data.message.length })
  }
})

avatarMessageObservable.add(({ type, ...data }) => queueTrackingEvent(type, data))
