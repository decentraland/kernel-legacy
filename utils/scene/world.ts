export const parcelSize = 16

export const parcelLimits = {
  // Maximum numbers for parcelScenes to prevent performance problems
  // Note that more limitations may be added to this with time
  // And we may also measure individual parcelScene performance (as
  // in webgl draw time) and disable parcelScenes based on that too,
  // Performance / anti-ddos work is a fluid area.

  // number of entities
  entities: 200,

  // Number of faces (per parcel)
  triangles: 10000,
  bodies: 300,
  textures: 10,
  materials: 20,
  height: 20,
  geometries: 200,

  parcelSize,
  halfParcelSize: parcelSize / 2,
  centimeter: 0.01,

  visibleRadius: 4,

  maxX: 3000,
  maxZ: 3000,
  minX: -3000,
  minZ: -3000,

  maxParcelX: 150,
  maxParcelZ: 150,
  minParcelX: -150,
  minParcelZ: -150,

  minLandCoordinateX: -150,
  minLandCoordinateY: -150,
  maxLandCoordinateX: 150,
  maxLandCoordinateY: 150
}

export const interactionLimits = {
  /**
   * click distance, this is the lenght of the ray/lens
   */
  clickDistance: 10
}

export const playerConfigurations = {
  gravity: -0.2,
  height: 1.6,
  handFromBodyDistance: 0.5,
  // The player speed
  speed: 2,
  runningSpeed: 8,
  // The player inertia
  inertia: 0.01,
  // The mouse sensibility (lower is most sensible)
  angularSensibility: 500
}
export const farDistance = parcelLimits.visibleRadius * parcelLimits.parcelSize

export const visualConfigurations = {
  fieldOfView: 75,

  farDistance,

  near: 0.08,
  far: farDistance
}
