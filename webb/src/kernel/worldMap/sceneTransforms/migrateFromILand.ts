import { ILand, ISceneManifest } from '@dcl/utils'
import { SceneManifest } from '../scene'
import { isValidSceneInput, getInvalidReason } from '../scene/validation'

export function migrateFromILand(scene: any, mappings?: any): ISceneManifest {
  const raw = scene.mappingsResponse ? _upgradeILandToSceneManifest(scene) : _upgradeToV2(scene, mappings)
  const manifest = new SceneManifest(raw)
  return manifest
}
function _upgradeILandToSceneManifest(scene: ILand<any>) {
  return _upgradeToV2(scene.scene, { data: [{ content: scene.mappingsResponse }] })
}

function _upgradeToV2(scene: any, mappings: any) {
  if (!mappings.data || !mappings.data[0] || !mappings.data[0].content || !mappings.data[0].content.contents) {
    throw new Error('Invalid mappings: key `data[0].content.contents` not found')
  }
  if (!Array.isArray(mappings.data[0].content.contents)) {
    throw new Error('Invalid mappings: key `data[0].content.contents` must be an array')
  }
  const sceneJson = mappings.data[0].content.contents.filter((f: any) => f.file === 'scene.json')
  if (!sceneJson || !sceneJson.length) {
    throw new Error('Invalid mappings: file `scene.json` not found')
  }
  const allContainFileAndHash = mappings.data[0].content.contents.filter((f: any) => !(f.file && f.hash))
  if (!allContainFileAndHash) {
    throw new Error('Invalid mappings: all files must have a `file` and `hash` value')
  }
  function lastPart(e: string) {
    const split = e.split('.')
    if (!split.length) {
      return ''
    }
    return split[split.length - 1]
  }
  const data = {
    version: 2,
    assets: mappings.data[0].content.contents
      .filter((f: any) => f.file !== 'scene.json')
      .map((value: any) => ({ name: value.file, hash: value.hash })),
    assetTags: [
      {
        name: 'required',
        assets: mappings.data[0].content.contents
          .map((e: any) => e.file)
          .filter((e: any) => ['js', 'glb', 'gltf'].includes(lastPart(e)))
      }
    ],
    requiredTags: ['required'],
    main: scene.main,
    basePosition: {
      rotation: { y: 0 },
      translation: { x: 0, y: 0, z: 0 }
    },
    parcels: scene.scene.parcels,
    contact: scene.contact,
    spawnPoints: [
      {
        name: 'defaultSpawn',
        position: {
          x: 0,
          y: 0,
          z: 0
        },
        camera: {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        },
        default: true
      }
    ],
    display: {
      title: scene.display.title
    }
  }
  if (!isValidSceneInput(data)) {
    throw new Error(getInvalidReason(data))
  }
  return data
}
