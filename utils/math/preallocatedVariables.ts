import { buildArray } from '../pure/buildArray'
import { MVector3 } from './MVector3'
import { Quaternion } from './Quaternion'
import { Matrix } from './Matrix'

// Temporary pre-allocated objects for engine internal use
// usage in any internal function :
// var tmp = Tmp.Vector3[0];   <= gets access to the first pre-created Vector3
// There's a Tmp array per object type : int, float, Vector2, Vector3, Vector4, Quaternion, Matrix

export const MathTmp = {
  Vector3: buildArray(6, MVector3.Zero),
  Matrix: buildArray(2, Matrix.Identity),
  Quaternion: buildArray(3, Quaternion.Zero),
  staticUp: MVector3.Up() as Readonly<MVector3>,
  tmpMatrix: Matrix.Zero()
}
