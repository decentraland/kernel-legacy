import { UnityGlobals } from './globals'
import { defaultLogger, Vector3 } from '@dcl/utils'
import { SceneManifest } from '~/kernel/worldMap/scene'
import { _V1_Profile } from './types'
import { ResolvedProfile } from '~/kernel/passports/passportTypes'

export const unityInterface = {
  debug: false,
  SetDebug() {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'SetDebug')
  },
  LoadProfile(profile: ResolvedProfile) {
    const profileData = {
      created_at: profile.created_at,
      description: profile.description,
      email: profile.email,
      name: profile.name,
      updated_at: profile.updated_at,
      userId: profile.userId,
      version: profile.version,
      avatar: JSON.parse(
        '{"snapshots":{"face":"https://s3.amazonaws.com/nico.decentraland.zone/email%7C5cbc03662d5f842a168f3d63/face.png","body":"https://s3.amazonaws.com/nico.decentraland.zone/email%7C5cbc03662d5f842a168f3d63/body.png"},"skin":{"color":{"r":0.9490196108818054,"g":0.7607843279838562,"b":0.6470588445663452,"a":1}},"hair":{"color":{"r":0.23529411852359772,"g":0.12941177189350128,"b":0.04313725605607033,"a":1}},"baseUrl":"https://s3.amazonaws.com/content-service.decentraland.org/","wearables":[{"category":"upper_body","contentName":"M_uBody_PuffJacketHoodie_01.glb","contents":[{"file":"AvatarWearables_TX.png","hash":"QmRaHnacT5G7oLYTYGsRWZtLXzXuTNEq7gWAcvXRSxfwEU"},{"file":"Avatar_MaleSkinBase.png","hash":"QmdyPfi4sRYU3eMFWxeXArnCeQ78sZw7oSGxFrntAPqHhy"},{"file":"M_uBody_PuffJacketHoodie_01.glb","hash":"QmPiQh6WNf8pwdqKbvJQc8xSkzTA59HZN964s5P85zTEL2"},{"file":"thumbnail.png","hash":"QmPDUM6R8wxwZQgr9n41r2ib9jSRA4hbJnz9xE1jXKqMK1"}]},{"category":"lower_body","contentName":"M_lBody_HipHopJoggers.glb","contents":[{"file":"AvatarWearables_TX.png","hash":"QmRaHnacT5G7oLYTYGsRWZtLXzXuTNEq7gWAcvXRSxfwEU"},{"file":"M_lBody_HipHopJoggers.glb","hash":"QmRg7DGviK3WzwVe2tVnWJQEGKs9BcFGiorciYrcGxxUVs"},{"file":"thumbnail.png","hash":"QmNZR5tqNjwFKN3fdfVfn5SvJQ2GycGw679XgjiwFzPT4W"}]},{"category":"feet","contentName":"M_Feet_SportBlueShoes.glb","contents":[{"file":"AvatarWearables_TX.png","hash":"QmWLrKJFzDCMGXVCef78SDkMHWB94eHP1ZeXfyci3kphTb"},{"file":"Avatar_MaleSkinBase.png","hash":"QmRxKVwraeAq8NwgJ1TM9VnrG4AaQ7HbATxg7BGAVcUhvH"},{"file":"M_Feet_SportBlueShoes.glb","hash":"QmT24PcJBo4oBj8NxqF7VpJyJ8CpobMiyku4ujCYH96NPY"},{"file":"thumbnail.png","hash":"QmQxgP7Cpm4xdGJZd1HWPQgsMKY1nA376AbfzJy7tMbEtL"}]},{"category":"hair","contentName":"M_Hair_BookStyle.glb","contents":[{"file":"AvatarWearables_TX.png","hash":"QmWLrKJFzDCMGXVCef78SDkMHWB94eHP1ZeXfyci3kphTb"},{"file":"M_Hair_BookStyle.glb","hash":"QmYUwzynDURZm5dFwgFDTp2MXRoBPs7G9ARkwvhGY4w9yX"},{"file":"thumbnail.png","hash":"QmQ5nAtpVM91i1FSkTRTqfGb3de2dnrZdJ9n1XJ8JqKkWS"}]},{"category":"eye_wear","contentName":"M_Eyewear_AviatorStyle.glb","contents":[{"file":"AvatarWearables_TX.png","hash":"QmWLrKJFzDCMGXVCef78SDkMHWB94eHP1ZeXfyci3kphTb"},{"file":"M_Eyewear_AviatorStyle.glb","hash":"Qmbv617p43YUd9g2Xo8YzmgutGXjGt8AXU89fL3TzZvN3L"},{"file":"thumbnail.png","hash":"QmTnNj1hRjdPbhQPo7Gg71RPT5FXiw2zLeqwZNYhwnhdhQ"}]}],"eyes":{"texture":"QmRQSdpHpmKEYf4JzEWZCRHZDYBc7RN5cqxvxMcL6sMzTq","mask":"QmRQSdpHpmKEYf4JzEWZCRHZDYBc7RN5cqxvxMcL6sMzTq","color":{"r":0.5254902243614197,"g":0.3803921639919281,"b":0.25882354378700256,"a":1}},"eyebrows":{"texture":"QmZGhEFGs2dBhwE1aAcA831d8nPYQZ6AkH3E1dcCWeWf86"},"mouth":{"texture":"QmXTvQ7rj1pZWsbad67xD9iC9XA8ZhvkvhddyET9bHkVXY"},"bodyShape":{"category":"body_shape","contentName":"BaseMale.glb","contents":[{"file":"Avatar_MaleSkinBase.png","hash":"QmdyPfi4sRYU3eMFWxeXArnCeQ78sZw7oSGxFrntAPqHhy"},{"file":"BaseMale.glb","hash":"QmRhw6iFmT1r8KTbComWMKFLPxf7pFZqFwKrEY1Az2whZ8"},{"file":"EyeBrows_00.png","hash":"QmP4823KZpn5d5iAEwXJyGTZy19HriJsJYkCJ22ERmpFMa"},{"file":"Eyes_00.png","hash":"QmUYEYptrfbtvAr53C4X3ReAtYYuQsuN41dB5D5cfuLxkh"},{"file":"Mouth_00.png","hash":"QmTZXe8CyZWCfV9KvjKx6LpYwDXAzCeRCozoZRuRUth7qP"},{"file":"thumbnail.png","hash":"QmbEoKs839SoKDSHF9tkgc3S6ge777ywU9X85W8K42WePu"}]}}'
      )
    }
    UnityGlobals.gameInstance.SendMessage('SceneController', 'LoadProfile', JSON.stringify(profileData))
  },
  CreateUIScene(data: { id: string; baseUrl: string }) {
    /**
     * UI Scenes are scenes that does not check any limit or boundary. The
     * position is fixed at 0,0 and they are universe-wide. An example of this
     * kind of scenes is the Avatar scene. All the avatars are just GLTFs in
     * a scene.
     */
    UnityGlobals.gameInstance.SendMessage('SceneController', 'CreateUIScene', JSON.stringify(data))
  },
  /** Sends the camera position to the engine */
  SetPosition(x: number, y: number, z: number, cameraTarget?: Vector3) {
    const theY = y <= 0 ? 2 : y

    UnityGlobals.gameInstance.SendMessage(
      'CharacterController',
      'SetPosition',
      JSON.stringify({ x, y: theY, z, cameraTarget })
    )
  },
  /** Tells the engine which scenes to load */
  LoadParcelScene(manifest: SceneManifest) {
    const scene = {
      basePosition: manifest.baseParcel,
      id: manifest.id,
      baseUrl: 'https://content.decentraland.org/contents/',
      contents: manifest.legacyMappings,
      parcels: manifest.parcels
    }
    UnityGlobals.gameInstance.SendMessage('SceneController', 'LoadParcelScenes', JSON.stringify([scene]))
  },
  UnloadScene(sceneId: string) {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'UnloadScene', sceneId)
  },
  SendSceneMessage(parcelSceneId: string, method: string, payload: string, tag: string = '') {
    if (unityInterface.debug) {
      defaultLogger.info(parcelSceneId, method, payload, tag)
    }
    UnityGlobals.gameInstance.SendMessage(
      `SceneController`,
      `SendSceneMessage`,
      `${parcelSceneId}\t${method}\t${payload}\t${tag}`
    )
  },

  SetSceneDebugPanel() {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'SetSceneDebugPanel')
  },

  SetEngineDebugPanel() {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'SetEngineDebugPanel')
  },
  ActivateRendering() {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'ActivateRendering')
  },
  DeactivateRendering() {
    UnityGlobals.gameInstance.SendMessage('SceneController', 'DeactivateRendering')
  },
  UnlockCursor() {
    UnityGlobals.gameInstance.SendMessage('MouseCatcher', 'UnlockCursor')
  }
}
