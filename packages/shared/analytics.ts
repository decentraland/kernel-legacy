import { DEBUG_ANALYTICS } from 'config'

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
