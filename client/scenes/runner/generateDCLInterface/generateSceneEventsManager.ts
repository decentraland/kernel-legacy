import { IEventNames } from '@dcl/scene-api'
import { ISceneRunningScript } from '../../types/ISceneRunningScript'

import { SceneEventsManager } from '../../exposedApis/SceneEventsManager'

export function generateSceneEventsManager(that: ISceneRunningScript) {
  const sceneEvents = new SceneEventsManager(1 as any)
  return {
    subscribe: (event: IEventNames) => sceneEvents.subscribe(event),
    unsubscribe: (event: IEventNames) => sceneEvents.unsubscribe(event)
  }
}
