import { ParcelSightController } from './ParcelSightController'
import { DeltaParcelSightSeeingReport } from './ParcelSight/types'

describe('Parcel lifecycle', () => {
  function setupController(radius: number): [ParcelSightController, DeltaParcelSightSeeingReport[]] {
    const controller = new ParcelSightController({ lineOfSightRadius: radius })
    const result: DeltaParcelSightSeeingReport[] = []
    controller.on('Parcel.sightChanges', report => {
      result.push(report)
    })
    return [controller, result]
  }

  it('correctly emits "onSight" the first time', () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    expect(result.length).toBe(1)
    expect(result[0].sighted).toContain('-1,0')
    expect(result[0].sighted).toContain('0,0')
    expect(result[0].sighted).toContain('0,1')
    expect(result[0].sighted).toContain('0,-1')
    expect(result[0].sighted).toContain('1,0')
    expect(result[0].lostSight).toEqual([])
  })
  it('differentially emits "onSight"', () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    controller.reportCurrentPosition({ x: 1, y: 0 })
    expect(result.length).toBe(2)
    expect(result[1].sighted.length).toBe(3)
    expect(result[1].lostSight.length).toBe(3)
    expect(result[1].sighted).toContain('1,1')
    expect(result[1].sighted).toContain('2,0')
    expect(result[1].sighted).toContain('1,-1')
    expect(result[1].lostSight).toContain('-1,0')
    expect(result[1].lostSight).toContain('0,-1')
    expect(result[1].lostSight).toContain('0,1')
  })
  it('teleport makes no difference equal to total', () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    controller.reportCurrentPosition({ x: 100, y: 0 })
    expect(result[1].sighted).toEqual(result[1].sighted)
  })
  it("teleport isn't a special case", () => {
    const [controller, result] = setupController(1)
    controller.reportCurrentPosition({ x: 0, y: 0 })
    controller.reportCurrentPosition({ x: 100, y: 0 })
    expect(result.length).toBe(2)
    expect(result[1].sighted.length).toBe(5)
    expect(result[1].lostSight.length).toBe(5)
    expect(result[1].lostSight).toContain('-1,0')
    expect(result[1].lostSight).toContain('0,0')
    expect(result[1].lostSight).toContain('0,1')
    expect(result[1].lostSight).toContain('0,-1')
    expect(result[1].lostSight).toContain('1,0')
    expect(result[1].sighted).toContain('100,0')
    expect(result[1].sighted).toContain('101,0')
    expect(result[1].sighted).toContain('99,0')
    expect(result[1].sighted).toContain('100,1')
    expect(result[1].sighted).toContain('100,-1')
  })
})
