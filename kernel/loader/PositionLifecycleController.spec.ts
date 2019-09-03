import { SetupPositionLifecycleController as setup } from './SetupPositionLifeCycleController.spec'

describe('Position Lifecycle', () => {
  it('Starts unsettled', () => {
    const { position, changePosition } = setup()
    changePosition(0, 0)
    expect(position.isSettled).toBe(false)
  })
  it('Hooks to scene to listen when scenes are ready', () => {
    const { fakeScene, position, changePosition } = setup()
    changePosition(0, 0)
    fakeScene.isPositionWalkable = (pos: string) => true
    fakeScene.emit('Scene.running')
    expect(position.isSettled).toBe(true)
  })
  it('Hooks to parcel lifecycle for settlement', () => {
    const { fakeScene, changePosition, position } = setup()
    changePosition(0, 0)
    fakeScene.isPositionWalkable = (pos: string) => true
    changePosition(0, 1)
    expect(position.isSettled).toBe(true)
  })
  it('Emits an event on settlement', () => {
    const { fakeScene, position, changePosition } = setup()
    changePosition(0, 0)
    const result = { success: false }
    position.on('Position.settled', () => (result.success = true))
    fakeScene.isPositionWalkable = (pos: string) => true
    changePosition(0, 1)
    expect(result.success).toBe(true)
  })
  it('Also unsettles', () => {
    const { fakeScene, position, changePosition } = setup()
    changePosition(0, 0)
    fakeScene.isPositionWalkable = (pos: string) => true
    changePosition(0, 1)
    expect(position.isSettled).toBe(true)
    fakeScene.isPositionWalkable = (pos: string) => false
    changePosition(100, 1)
    expect(position.isSettled).toBe(false)
  })
  it('Emits unsettlement', () => {
    const { fakeScene, position, changePosition } = setup()
    changePosition(0, 0)
    const result = { success: false }
    fakeScene.isPositionWalkable = (pos: string) => true
    changePosition(0, 1)
    expect(position.isSettled).toBe(true)
    fakeScene.isPositionWalkable = (pos: string) => false
    position.on('Position.unsettled', () => (result.success = true))
    changePosition(100, 1)
    expect(result.success).toBe(true)
  })
})
