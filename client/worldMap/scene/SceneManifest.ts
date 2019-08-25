import {
  UnsanitizedSceneManifest,
  Coordinate,
  NonEmptyCoordinateArray,
  AssetDefinition,
  AssetTagDefinition,
  ReferenceSystem,
  SpawnPoint,
  decideFloat,
  parseCoordinate,
  getMinimum,
  ISceneManifest
} from '@dcl/utils'

import { stableStringify, parcelLimits, sha256 } from '@dcl/utils'
import { isValidSceneInput, getInvalidReason } from './validation'
export class SceneManifest implements ISceneManifest {
  raw: UnsanitizedSceneManifest
  private _cannonicalRepresentation?: string
  private _requiredAssets?: AssetDefinition[]
  private _referenceSystem?: ReferenceSystem
  private _requiredTags?: string[]
  private _spawnPoints?: [SpawnPoint, ...SpawnPoint[]]
  private _parcels?: NonEmptyCoordinateArray
  private _baseParcel?: Coordinate
  private _version?: number
  private _cannonicalCID?: string
  constructor(raw: any) {
    if (!isValidSceneInput(raw)) {
      throw new Error('Invalid input: ' + getInvalidReason(raw))
    }
    this.raw = raw
  }
  get sceneCID(): string {
    return this.cannonicalSerialization
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
    debugger
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
      const filteredTags = this.assetTags.filter(assetTag => this.requiredTags.includes(assetTag.name))
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
  pickSpawnPoint() {
    const allSpawnPoints = this.spawnPoints
    const spawnArea = allSpawnPoints[Math.floor(Math.random() * allSpawnPoints.length)]
    return {
      ...spawnArea,
      position: {
        x: decideFloat(spawnArea.position.x) + this.baseParcel.x * parcelLimits.parcelSize,
        y: decideFloat(spawnArea.position.y),
        z: decideFloat(spawnArea.position.z) + this.baseParcel.y * parcelLimits.parcelSize
      },
      camera: {
        y: decideFloat(spawnArea.camera.y)
      }
    }
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
  get cannonicalSerialization(): string {
    if (!this._cannonicalRepresentation) {
      this._cannonicalRepresentation = stableStringify({
        parcels: this.parcels,
        version: this.version,
        display: this.raw.display || {},
        main: this.main,
        assets: this.assets,
        assetTags: this.assetTags,
        spawnPoints: this.spawnPoints,
        referenceSystem: this.referenceSystem
      } as any)
    }
    return this._cannonicalRepresentation
  }
  get cannonicalCID(): string {
    if (!this._cannonicalCID) {
      // TODO: Use CIDv0 encoding
      this._cannonicalCID = sha256(this.cannonicalSerialization)
    }
    return this._cannonicalCID
  }
}
