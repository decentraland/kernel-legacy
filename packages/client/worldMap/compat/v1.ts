export function upgradeToV2(scene: any, mappings: any) {
  return {
    version: 2,
    assets: mappings.data[0].content.contents.filter((f: any) => f.file !== 'scene.json').map((value: any) => ({ name: value.file, hash: value.hash })),
    assetTags: [
      {
        name: 'required',
        assets: mappings.data[0].content.contents
          .map((e: any) => e.file)
          .filter((e: any) => ['js', 'glb', 'gltf'].includes(e.split('.')[e.split('.').length - 1]))
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
}
