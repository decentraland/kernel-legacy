declare var analytics: any

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
  if (!analytics) {
    return
  }

  analytics.load(segmentKey)
  analytics.page()

  return analytics.identify(id, {
    name,
    email
  })
}

export function queueTrackingEvent(eventName: string, eventData: any) {
  if (!analytics) {
    return
  }

  trackingQueue.push({ name: eventName, data: eventData })
  if (!tracking) {
    startTracking()
  }
}

function startTracking() {
  tracking = true
  track(trackingQueue.shift())
}

function track({ name, data }: SegmentEvent) {
  analytics
    .track(name, data)
    .then(() => {
      if (trackingQueue.length === 0) {
        tracking = false
        return
      }
      track(trackingQueue.shift())
    })
    .catch(() => null)
}
