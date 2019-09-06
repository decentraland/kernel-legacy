import { parcelLimits } from './world'

import { Vector3, Vector2 } from '../Vector'
import { isEqual2 } from '../pure/vectorHelpers'
import { MVector2 } from '../math'

let auxVec3: Vector3 = { x: 0, y: 0, z: 0 }

export interface BoundingInfo {
  maximum: Vector3
  minimum: Vector3
}

/**
 * Transforms a grid position into a world-relative 3d position
 */
export function gridToWorld(x: number, y: number, target?: Vector3): [number, number, number] {
  if (!target) {
    return [x * parcelLimits.parcelSize, 0, y * parcelLimits.parcelSize]
  }
  target.x = x * parcelLimits.parcelSize
  target.y = 0
  target.z = y * parcelLimits.parcelSize
  return [target.x, target.y, target.z]
}

/**
 * Transforms a world position into a grid position
 */
export function worldToGrid(vector: Vector3, target?: MVector2): [number, number] {
  if (!target) {
    return [Math.floor(vector.x / parcelLimits.parcelSize), Math.floor(vector.z / parcelLimits.parcelSize)]
  }
  target.x = Math.floor(vector.x / parcelLimits.parcelSize)
  target.y = Math.floor(vector.z / parcelLimits.parcelSize)
  return [target.x, target.y]
}

const highDelta = parcelLimits.parcelSize + parcelLimits.centimeter
const lowDelta = parcelLimits.centimeter
/**
 * Returns true if a vector is inside a parcel
 */
export function isInParcel(test: Vector3, center: Vector3): boolean {
  return (
    test.x < center.x + highDelta &&
    test.x > center.x - lowDelta &&
    test.z < center.z + highDelta &&
    test.z > center.z - lowDelta
  )
}

export function isOnLimits({ maximum, minimum }: BoundingInfo, parcels: Vector3[]): boolean {
  // Computes the world-axis-aligned bounding box of an object (including its children),
  // accounting for both the object's, and children's, world transforms

  let minInside = false
  let maxInside = false

  for (let i = 0; i < parcels.length && (!minInside || !maxInside); i++) {
    maxInside = maxInside || isInParcel(maximum, parcels[i])
    minInside = minInside || isInParcel(minimum, parcels[i])
  }

  // If the max&min points are inside some of the whitelisted areas, it is considered inside the parcel
  return minInside && maxInside
}

/**
 * Transforms a world position into a parcel-relative 3d position
 */
export function gridToParcel(base: Vector2, x: number, y: number, target: Vector3) {
  gridToWorld(base.x, base.y, auxVec3)
  gridToWorld(x, y, target)
  target.x -= auxVec3.x
  target.y -= auxVec3.y
  target.z -= auxVec3.z
}

export function decodeParcelSceneBoundaries(boundaries: string) {
  const [base, ...parcels] = boundaries.split(/\s*;\s*/).map($ => parseParcelPosition($))
  return { base, parcels }
}

/**
 * Converts a position into a string { x: -1, y: 5 } => "-1,5"
 */
export function encodeParcelPosition(base: Vector2) {
  return `${base.x | 0},${base.y | 0}`
}
export function encodeParcelPositionFromCoordinates(x: number, y: number) {
  return `${x},${y}`
}
export function encodeParcelSceneBoundaries(base: Vector2, parcels: Vector2[]) {
  let str = encodeParcelPosition(base)

  for (let index = 0; index < parcels.length; index++) {
    const parcel = parcels[index]
    str = str + `;${encodeParcelPosition(parcel)}`
  }

  return str
}

/**
 * Converts a string position "-1,5" => { x: -1, y: 5 }
 */
export function parseParcelPosition(position: string) {
  const [x, y] = position
    .trim()
    .split(/\s*,\s*/)
    .map($ => parseInt($, 10))
  return { x, y }
}

/**
 * Returns `true` if the given parcels are connected (no separations between them)
 */
export function isValidParcelSceneShape(parcels: Vector2[]): boolean {
  return areConnected(parcels) // && !hasHoles(parcels) ?
}

/**
 * Returns true if the given parcels array are connected
 */
export function areConnected(parcels: Vector2[]): boolean {
  if (parcels.length === 0) {
    return false
  }
  const visited = visitParcel(parcels[0], parcels)
  return visited.length === parcels.length
}

function visitParcel(parcel: Vector2, allParcels: Vector2[] = [parcel], visited: Vector2[] = []): Vector2[] {
  let isVisited = visited.some(visitedParcel => isEqual2(visitedParcel, parcel))
  if (!isVisited) {
    visited.push(parcel)
    let neighbours = getNeighbours(parcel.x, parcel.y, allParcels)
    neighbours.forEach(neighbours => visitParcel(neighbours, allParcels, visited))
  }
  return visited
}

function getIsNeighbourMatcher(x: number, y: number) {
  return (coords: Vector2) =>
    (coords.x === x && (coords.y + 1 === y || coords.y - 1 === y)) ||
    (coords.y === y && (coords.x + 1 === x || coords.x - 1 === x))
}

function getNeighbours(x: number, y: number, parcels: Vector2[]): Vector2[] {
  return parcels.filter(getIsNeighbourMatcher(x, y))
}
