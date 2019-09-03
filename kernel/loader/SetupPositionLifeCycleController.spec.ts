import { ParcelSightController } from './ParcelSightController'
import { PositionLifeCycleController } from './PositionLifecycleController'
import { EventEmitter } from 'events'

export function SetupPositionLifecycleController(lineOfSightRadius: number = 1) {
  const parcels = new ParcelSightController({ lineOfSightRadius })
  const emitter = new EventEmitter()
  const fakeScene = {
    on: (event: string, callback: any) => emitter.on(event, callback),
    emit: (event: string, ...args: any[]) => emitter.emit(event, ...args),
    isPositionWalkable: (position: string) => false
  }
  const position = new PositionLifeCycleController(parcels, fakeScene as any)
  const changePosition = (x: number, y: number) => {
    parcels.reportCurrentPosition({ x, y })
  }
  return {
    changePosition,
    parcels,
    fakeScene,
    position
  }
}
