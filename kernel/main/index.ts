import { AssetSystem } from './impl/Assets'
import { SubsystemController } from './subsystems'
import { ConfigSystem } from './impl/Config'
import { AuthSystem } from './impl/Auth'
import { CommsSystem } from './impl/Comms'
import { PassportSystem } from './impl/Passport'
import { PeerPresenceSystem } from './impl/PeerPresence'
import { SocialModerationSystem } from './impl/SocialModeration'
import { InWorldAvatarSystem } from './impl/InWorldAvatars'
import { WorldMapSystem } from './impl/WorldMap'
import { SceneLoaderSystem } from './impl/SceneLoader'
import { SceneRunnerSystem } from './impl/SceneRunner'
import { MyPresenceSystem } from './impl/MyPresence'

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

export type SubsystemAccess = {
  Assets: AssetSystem
  Auth: AuthSystem
  Comms: CommsSystem
  Config: ConfigSystem
  Passports: PassportSystem
  PeerPresence: PeerPresenceSystem
  MyPresence: MyPresenceSystem
  SocialModeration: SocialModerationSystem
  InWorldAvatars: InWorldAvatarSystem
  WorldMap: WorldMapSystem
  SceneLoader: SceneLoaderSystem
  SceneRunner: SceneRunnerSystem
}

export class MainControllerImpl {
  subsystems: SubsystemController[] = []
  indexedSystems: Map<string, SubsystemController> = new Map<string, SubsystemController>()

  constructor() {
    const config = this.newSystem('Config', new ConfigSystem([]))
    const assets = this.newSystem('Assets', new AssetSystem([]))
    const auth = this.newSystem('Auth', new AuthSystem([config]))
    const comms = this.newSystem('Comms', new CommsSystem([auth]))
    const passports = this.newSystem('Passports', new PassportSystem([assets, auth]))
    const presence = this.newSystem('PeerPresence', new PeerPresenceSystem([comms, passports]))
    const socialModeration = this.newSystem('SocialModeration', new SocialModerationSystem([passports]))
    const inworldAvatars = this.newSystem(
      'InWorldAvatars',
      new InWorldAvatarSystem([comms, passports, socialModeration, presence, assets])
    )
    const worldMap = this.newSystem('WorldMap', new WorldMapSystem([config]))
    const sceneLoader = this.newSystem('SceneLoader', new SceneLoaderSystem([worldMap, inworldAvatars]))
    const sceneRunner = this.newSystem('SceneRunner', new SceneRunnerSystem([sceneLoader, inworldAvatars]))
    this.newSystem('MyPresence', new MyPresenceSystem([comms, sceneLoader, sceneRunner]))

    this.subsystems.forEach(subsystem => {
      Object.defineProperty(this, subsystem.name, {
        value: subsystem,
        enumerable: true,
        writable: false
      })
    })
  }

  start() {
    this.indexedSystems.get('Config').tryStart()
  }

  newSystem(name: string, system: SubsystemController) {
    system.name = name
    this.indexedSystems.set(name, system)
    this.subsystems.push(system)
    return system
  }
}

export type MainController = MainControllerImpl & SubsystemAccess
