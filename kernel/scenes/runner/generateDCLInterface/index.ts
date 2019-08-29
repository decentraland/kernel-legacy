import { ISceneRunningScript } from '../../types/ISceneRunningScript'
import { generateECSInterface } from './generateECSInterface'
import { generateSceneScriptLifecycleManager } from './generateSceneScriptLifecycleManager'
import { generateRPCHostManager } from './generateRPCHostManager'
import { generateSceneEventsManager } from './generateSceneEventsManager'
import { DecentralandInterface } from '@dcl/scene-api'

export function generateDCLInterface(that: ISceneRunningScript): DecentralandInterface {
  return {
    DEBUG: true,
    ...generateSceneEventsManager(that),
    ...generateECSInterface(that),
    ...generateSceneScriptLifecycleManager(that),
    ...generateRPCHostManager(that)
  }
}
