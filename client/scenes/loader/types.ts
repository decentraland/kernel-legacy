import { parseParcelPosition, ILand } from 'dcl/utils'

export class ParcelLifeCycleStatus {
  x: number
  y: number
  xy: string

  constructor(coord: string) {
    const { x, y } = parseParcelPosition(coord)
    this.x = x
    this.y = y
    this.xy = coord
    this.status = 'oos'
  }

  private status: 'in sight' | 'oos'

  isOutOfSight() {
    return this.status === 'oos'
  }
  isInSight() {
    return this.status === 'in sight'
  }
  setInSight() {
    this.status = 'in sight'
  }
  setOffSight() {
    this.status = 'oos'
  }
}

export class SceneLifeCycleStatus {
  status: 'unloaded' | 'awake' | 'ready' = 'unloaded'

  constructor(public sceneDescription: ILand) {}

  isAwake() {
    return this.status !== 'unloaded'
  }

  isDead() {
    return this.status === 'unloaded'
  }

  isRunning() {
    return this.status === 'ready'
  }
}
