import { MVector3 } from './MVector3'

/**
 * Defines the 3 main axes
 * @public
 */
export class Axis {
  /** X axis */
  public static X: MVector3 = new MVector3(1.0, 0.0, 0.0)
  /** Y axis */
  public static Y: MVector3 = new MVector3(0.0, 1.0, 0.0)
  /** Z axis */
  public static Z: MVector3 = new MVector3(0.0, 0.0, 1.0)
}
