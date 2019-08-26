// The order is [X,Y,Z,Qx,Qy,Qz,Qw]
export type Pose = [number, number, number, number, number, number, number]

/**
 * Use this for debugging only (it has not been tested and might be slow)
 */
export function __decodePose(_: Pose) {
  return {
    position: { x: _[0], y: _[1], z: _[2] },
    rotation: { x: _[3], y: _[4], z: _[5], w: _[6] }
  }
}
