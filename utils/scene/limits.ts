import { parcelLimits } from './world'

export type IParcelSceneLimits = {
  triangles: number
  entities: number
  bodies: number
  materials: number
  textures: number
  geometries: number
}

export function getParcelSceneLimits(parcelCount: number): IParcelSceneLimits {
  const log = Math.log2(parcelCount + 1)
  const lineal = parcelCount
  return {
    triangles: Math.floor(lineal * parcelLimits.triangles),
    bodies: Math.floor(lineal * parcelLimits.bodies),
    entities: Math.floor(lineal * parcelLimits.entities),
    materials: Math.floor(log * parcelLimits.materials),
    textures: Math.floor(log * parcelLimits.textures),
    geometries: Math.floor(log * parcelLimits.geometries)
  }
}
