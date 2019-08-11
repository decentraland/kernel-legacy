import { AssetSystem } from './impl/Assets'
import { SubsystemController } from './subsystems'
import { ConfigSystem } from './impl/Config'
import { AuthSystem } from './impl/Auth'
import { CommsSystem } from './impl/Comms'
import { PassportSystem } from './impl/Passport'
import { PeerPresenceSystem } from './impl/PeerPresence'
import { SocialModerationSystem } from './impl/SocialModeration'

export type Subsystems =
  | 'Assets'
  | 'Auth'
  | 'Comms'
  | 'Config'
  | 'Passports'
  | 'PeerPresence'
  | 'MyPresence'
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
    const passports = new PassportSystem('Passports', [assets, auth])
    const presence = new PeerPresenceSystem('PeerPresence', [comms, passports])
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
