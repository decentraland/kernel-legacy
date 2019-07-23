import { isValidSceneObject } from './validation'
import {
  WellDefinedScene,
  CoordinateDefinition,
  Coordinate,
  SceneJson,
  NonEmptyCoordinateArray,
  AssetDefinition,
  AssetTagDefinition,
  ReferenceSystem,
  SpawnPoint
} from './types'
import { createHash } from 'crypto'

export function parseCoordinate(coord: CoordinateDefinition) {
  if (typeof coord === 'string') {
    const [x, y] = coord.split(',').map(parseInt)
    return { x, y }
  }
  return coord
}

export function getMinimum(coords: Coordinate[]) {
  return coords.sort((a, b) => (a.x > b.x ? 1 : a.x === b.x ? a.y - b.y : -1))[0]
}

export class Scene implements WellDefinedScene {
  raw: SceneJson

  private _requiredAssets?: AssetDefinition[]
  private _referenceSystem?: ReferenceSystem
  private _requiredTags?: string[]
  private _spawnPoints?: [SpawnPoint, ...SpawnPoint[]]
  private _parcels?: NonEmptyCoordinateArray
  private _baseParcel?: Coordinate
  private _version?: number
  private _cannonicalCID?: string

  constructor(raw: any) {
    if (!isValidSceneObject(raw)) {
      throw new Error('Invalid input')
    }
    this.raw = raw
  }

  get parcels(): NonEmptyCoordinateArray {
    if (!this._parcels) {
      this._parcels = this.raw.parcels.map(parseCoordinate) as NonEmptyCoordinateArray
    }
    return this._parcels
  }

  get baseParcel(): Coordinate {
    if (!this._baseParcel) {
      this._baseParcel = getMinimum(this.parcels)
    }
    return this._baseParcel
  }

  get version(): number {
    if (!this._version) {
      this._version = this.raw.version
    }
    return this._version
  }

  get title(): string {
    return (this.raw.display && this.raw.display['title']) || 'Untitled scene'
  }

  get screenshot(): string {
    return (this.raw.display && this.raw.display['snapshot']) || ''
  }

  get main(): string {
    return this.raw.main
  }

  get assets(): AssetDefinition[] {
    return this.raw.assets
  }

  get assetTags(): AssetTagDefinition[] {
    return this.raw.assetTags || []
  }

  get requiredTags(): string[] {
    if (!this._requiredTags) {
      this._requiredTags = this.raw.requiredTags || ['required', 'userRequired']
    }
    return this._requiredTags
  }

  get requiredAssets(): AssetDefinition[] {
    if (!this._requiredAssets) {
      const filteredTags = this.assetTags.filter(
        assetTag => this.requiredTags.includes(assetTag.name)
      )
      const mappedTags = filteredTags.map(assetTag => assetTag.assets as string[])
      const reducedTags = mappedTags.reduce((a, b) => a.concat(b), [])
      const requiredAssetNames = reducedTags.concat([this.main])
      this._requiredAssets = this.raw.assets.filter(asset => requiredAssetNames.includes(asset.name))
    }
    return this._requiredAssets
  }

  get spawnPoints(): [SpawnPoint, ...SpawnPoint[]] {
    if (!this._spawnPoints) {
      if (!this.raw.spawnPoints) {
        this._spawnPoints = [
          {
            camera: { y: 0 },
            position: { x: 0, y: 0, z: 0 }
          }
        ]
      } else {
        this._spawnPoints = this.raw.spawnPoints
      }
    }
    return this._spawnPoints
  }

  get referenceSystem(): ReferenceSystem {
    if (!this._referenceSystem) {
      this._referenceSystem = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { y: 0 }
      }
    }
    return this._referenceSystem
  }

  get cannonicalCID(): string {
    if (!this._cannonicalCID) {
      // TODO: `JSON.stringify(this)` should be remplazed by
      // `this.cannonicalSerialization`, which should hold a
      // deterministic encoding of all our computed fields
      // AKA: Beware! JSON serialization is not deterministic
      this._cannonicalCID = createHash('sha256')
        .update(JSON.stringify(this))
        .digest()
        // TODO: Use CIDv0 encoding
        .toString('hex')
    }
    return this._cannonicalCID
  }
}
