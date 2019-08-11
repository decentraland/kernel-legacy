import { AssetSystem } from './impl/Assets'
import { SubsystemController } from './subsystems'

export type Subsystems =
  | 'Assets'
  | 'Auth'
  | 'Comms'
  | 'Config'
  | 'Passports'
  | 'Presence'
  | 'SocialModeration'
  | 'InWorldAvatars'
  | 'WorldMap'
  | 'SceneLoader'
  | 'SceneRunner'

export class MainController {
  subsystems: SubsystemController[] = []
  indexedSystems: Map<string, SubsystemController> = new Map<
    string,
    SubsystemController
  >()

  constructor() {
    const config = new ConfigSystem('Config', [])
    const assets = new AssetSystem('Assets', [config])
    const auth = new AuthSystem('Auth', [config])
    const comms = new CommsSystem('Comms', [auth])
    const passports = new PassportsSystem('Passports', [assets, auth])
    const presence = new PresenceSystem('Presence', [comms, passports])
    const socialModeration = new SocialModerationSystem('SocialModeration', [
      passports
    ])
    const inworldAvatars = new InWorldAvatars('InWorldAvatars', [
      comms,
      passports,
      socialModeration,
      presence,
      assets
    ])
    const worldMap = new WorldMapSystem('WorldMap', [config])
    const sceneLoader = new SceneLoaderSystem('SceneLoader', [
      worldMap,
      inworldAvatars
    ])
    const sceneRunner = new SceneRunnerSystem('SceneRunner', [
      sceneLoader,
      inworldAvatars
    ])
    this.subsystems = [
      assets,
      config,
      auth,
      comms,
      passports,
      presence,
      socialModeration,
      inworldAvatars,
      worldMap,
      sceneLoader,
      sceneRunner
    ]
    this.indexedSystems.set('Assets', assets)
  }
}
