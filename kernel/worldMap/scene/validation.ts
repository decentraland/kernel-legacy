import { isArray, isNumber } from 'util'
import {
  AssetDefinition,
  AssetTagDefinition,
  ReferenceSystem,
  CoordinateDefinition,
  Coordinate,
  SpawnPointDefinition,
  Vector3Range,
  NumberOrRange,
  Range2,
  YRotation,
  UnsanitizedSceneManifest
} from '@dcl/utils/scene/SceneManifestTypes'
import { Vector3 } from '@dcl/utils'

export function getInvalidReason(arg: any) {
  if (!hasValidVersion(arg)) {
    return 'version'
  }
  if (!hasValidAssets(arg)) {
    return 'assets'
  }
  if (!hasValidAssetTags(arg)) {
    return 'assetTags'
  }
  if (!hasValidRequiredTags(arg)) {
    return 'requiredTags'
  }
  if (!hasValidMain(arg)) {
    return 'main'
  }
  if (!hasValidReferenceSystem(arg)) {
    return 'referenceSystem'
  }
  if (!hasValidParcels(arg)) {
    return 'parcels'
  }
  if (!hasValidContact(arg)) {
    return 'contact'
  }
  if (!hasValidSpawnPoints(arg)) {
    return 'spawnPoint'
  }
  if (!hasValidDisplay(arg)) {
    return 'display'
  }
}

export function isValidSceneInput(arg: any): arg is UnsanitizedSceneManifest {
  return typeof arg === 'object' && getInvalidReason(arg) === undefined
}

export function hasValidVersion(arg: any) {
  return arg.version && typeof arg.version === 'number' && [1, 2].includes(arg.version)
}

export function isValidNumber(arg: any): arg is number {
  return isNumber(arg)
}

export function hasValidAssets(arg: any) {
  return arg.assets && isArray(arg.assets) && arg.assets.reduce((a: boolean, b: any) => a && isValidAsset(b), true)
}

export function isValidAsset(arg: any): arg is AssetDefinition {
  return (
    arg &&
    typeof arg === 'object' &&
    typeof arg.name === 'string' &&
    (typeof arg.uri === 'string' || typeof arg.hash === 'string')
  )
}

export function hasValidAssetTags(arg: any): arg is { assetTags?: AssetTagDefinition[] } {
  return (
    arg.assetTags === undefined ||
    (isArray(arg.assetTags) && arg.assetTags.reduce((a: boolean, b: any) => a && isValidAssetTag(b), true))
  )
}

export function isValidAssetTag(arg: any): arg is AssetTagDefinition {
  return arg && typeof arg.name === 'string' && isArray(arg.assets) && isValidStringArray(arg.assets)
}

export function isValidStringArray(arg: any): arg is string[] {
  return isArray(arg) && arg.reduce((a: boolean, b: any) => a && typeof b === 'string', true)
}

export function hasValidRequiredTags(arg: any): arg is { requiredTags?: string[] } {
  return arg.requiredTags === undefined || isValidStringArray(arg.requiredTags)
}

export function hasValidMain(arg: any): arg is { main?: string } {
  return arg.main === undefined || isValidString(arg.main)
}

export function isValidString(arg: any): arg is string {
  return typeof arg === 'string'
}

export function hasValidReferenceSystem(arg: any): arg is { referenceSystem?: ReferenceSystem } {
  return (
    arg.referenceSystem === undefined ||
    ((typeof arg.referenceSystem.position === 'undefined' || isValidVector3(arg.referenceSystem.position)) &&
      (typeof arg.referenceSystem.rotation === 'undefined' || isValidYRotation(arg.referenceSystem.rotation)))
  )
}

export function isValidVector3(arg: any): arg is Vector3 {
  return typeof arg === 'object' && isValidNumber(arg.x) && isValidNumber(arg.y) && isValidNumber(arg.z)
}

export function hasValidParcels(arg: any): arg is { parcels: CoordinateDefinition[] } {
  return (
    isArray(arg.parcels) &&
    arg.parcels.length > 0 &&
    arg.parcels.reduce((a: boolean, b: any) => a && isValidCoordinateDefinition(b), true)
  )
}

export const CoordinateRegex = /^-?\d+,-?\d+$/

export function isValidCoordinateDefinition(arg: any): arg is CoordinateDefinition {
  return (typeof arg === 'string' && CoordinateRegex.test(arg)) || (typeof arg === 'object' && isValidCoordinate(arg))
}

export function isValidCoordinate(arg: any): arg is Coordinate {
  return typeof arg === 'object' && isValidNumber(arg.x) && isValidNumber(arg.y)
}

export function hasValidContact(arg: any): arg is { contact?: Record<string, string> } {
  return arg.contact === undefined || isValidStringRecord(arg.contact)
}

export function isValidStringRecord(arg: any): arg is Record<string, string> {
  return Object.keys(arg).reduce((a: boolean, b: any) => a && typeof b === 'string' && typeof arg[b] === 'string', true)
}

export function hasValidSpawnPoints(arg: any): arg is { spawnPoints?: SpawnPointDefinition[] } {
  return (
    arg.spawnPoints === undefined ||
    (isArray(arg.spawnPoints) && arg.spawnPoints.reduce((a: boolean, b: any) => a && isValidSpawnPoint(b), true))
  )
}

export function isValidSpawnPoint(arg: any): arg is SpawnPointDefinition {
  return (
    (arg.name === undefined || isValidString(arg.name)) &&
    isValidVector3NumberOrRange(arg.position) &&
    (isValidQuaternionRange(arg.camera) || isValidYRotation(arg.camera)) &&
    (arg.default === undefined || typeof arg.default === 'boolean')
  )
}

export function isValidVector3NumberOrRange(arg: any): arg is Vector3Range {
  return (
    typeof arg === 'object' && isValidNumberOrRange(arg.x) && isValidNumberOrRange(arg.y) && isValidNumberOrRange(arg.z)
  )
}

export function isValidQuaternionRange(arg: any): arg is Vector3Range {
  return (
    typeof arg === 'object' &&
    isValidNumberOrRange(arg.x) &&
    isValidNumberOrRange(arg.y) &&
    isValidNumberOrRange(arg.z) &&
    isValidNumberOrRange(arg.w)
  )
}

export function isValidNumberOrRange(arg: any): arg is NumberOrRange {
  return isValidNumber(arg) || isValidRange(arg)
}

export function isValidRange(arg: any): arg is Range2 {
  return isArray(arg) && arg.length === 2 && isValidNumber(arg[0]) && isValidNumber(arg[1])
}

export function isValidYRotation(arg: any): arg is YRotation {
  return typeof arg === 'object' && isValidNumberOrRange(arg.y)
}

export function hasValidDisplay(arg: any): arg is { display?: Record<string, string> } {
  return arg.display === undefined || isValidStringRecord(arg.display)
}
