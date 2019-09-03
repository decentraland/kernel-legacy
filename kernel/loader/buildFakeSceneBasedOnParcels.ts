import { SceneManifest } from '../worldMap/scene'
export function buildFakeSceneBasedOnParcels(sceneId: string, positions: string[]) {
  return new SceneManifest({
    version: 2,
    assets: [{ name: 'scene.js', hash: 'Qm-fake-scene.js-' + sceneId }],
    assetTags: [{ name: 'required', assets: ['scene.js'] }],
    requiredTags: ['required'],
    main: 'scene.js',
    referenceSystem: { rotation: { y: 90 }, translation: { x: 16, y: 0, z: 0 } },
    parcels: positions,
    contact: { name: 'John Doe', email: 'john@doe.com' },
    spawnPoints: [],
    display: { title: 'My Land' }
  })
}
