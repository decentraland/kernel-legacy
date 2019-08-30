import { ParcelLifeCycleController } from './ParcelLifeCycleController'

describe('Parcel lifecycle', () => {
  function setupController(
    radius: number,
    initialPosition?: [number, number]
  ): [ParcelLifeCycleController, { seen: string[]; hide: string[] }[]] {
    const controller = new ParcelLifeCycleController({ lineOfSightRadius: radius })
    const result: { seen: string[]; hide: string[] }[] = []
    controller.on('Parcel.sightChanges', (seen, hide) => {
      result.push({ seen, hide })
    })
    return [controller, result]
  }

  it('correctly emits "onSight"', () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    expect(result.length).toBe(1)
    expect(result[0].seen).toContain('-1,0')
    expect(result[0].seen).toContain('0,0')
    expect(result[0].seen).toContain('0,1')
    expect(result[0].seen).toContain('0,-1')
    expect(result[0].seen).toContain('1,0')
    expect(result[0].hide).toEqual([])
  })
  it('differentially emits "onSight"', () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    controller.reportCurrentPosition({ x: 1, y: 0 })
    expect(result.length).toBe(2)
    expect(result[1].seen.length).toBe(3)
    expect(result[1].hide.length).toBe(3)
    expect(result[1].seen).toContain('1,1')
    expect(result[1].seen).toContain('1,0')
    expect(result[1].seen).toContain('1,-1')
    expect(result[1].hide).toContain('-1,0')
    expect(result[1].seen).toContain('0,-1')
    expect(result[1].seen).toContain('1,0')
  })
})
