import { ResolutionSystem } from './ResolutionSystem'
import { EventEmitter } from 'events'
import future from 'fp-future'

class ResolutionTest extends ResolutionSystem<string> {
  emitter = new EventEmitter()
  release(data?: any) {
    this.emitter.emit('release', data)
  }
  fail() {
    this.emitter.emit('fail')
  }
  async executeResolution(key: string) {
    const block = future<string>()
    this.emitter.once('fail', (data: any) => block.reject(new Error(data)))
    this.emitter.once('release', (data: any) => block.resolve(data))
    return block
  }
  processResolution(key: string, intermediate: string) {
    if (intermediate === 'runtime error') {
      ;(undefined as any)()
    }
    return intermediate
  }
}

describe('ResulutionSystem', () => {
  it('happy path works', done => {
    const myTest = new ResolutionTest()
    myTest.resolve('1').then(() => {
      expect(myTest.record.get('1').data).toBe('1')
      expect(myTest.record.get('1').loading).toBe(false)
      expect(myTest.record.get('1').error).toBe(false)
      expect(myTest.record.get('1').success).toBe(true)
      expect(myTest.record.get('1').promise.isPending).toBe(false)
      done()
    })
    myTest.release('1')
  })
  it('error path works', done => {
    const myTest = new ResolutionTest()
    myTest.resolve('1').then(result => {
      expect(myTest.record.get('1').data).toBe(undefined)
      expect(myTest.record.get('1').loading).toBe(false)
      expect(myTest.record.get('1').error).toBeTruthy()
      expect(myTest.record.get('1').success).toBe(false)
      expect(myTest.record.get('1').promise.isPending).toBe(false)
      done()
    })
    myTest.fail()
  })
  it('null? works', done => {
    const myTest = new ResolutionTest()
    myTest.resolve('1').then(result => {
      expect(myTest.record.get('1').data).toBe(null)
      expect(myTest.record.get('1').loading).toBe(false)
      expect(myTest.record.get('1').error).toBe(false)
      expect(myTest.record.get('1').success).toBe(true)
      expect(myTest.record.get('1').promise.isPending).toBe(false)
      done()
    })
    myTest.release(null)
  })
  it('undefined is not a function', done => {
    const myTest = new ResolutionTest()
    myTest.resolve('1').then(() => {
      expect(myTest.record.get('1').data).toBe('runtime error')
      expect(myTest.record.get('1').loading).toBe(false)
      expect(myTest.record.get('1').error).toBeTruthy()
      expect(myTest.record.get('1').success).toBe(false)
      expect(myTest.record.get('1').promise.isPending).toBe(false)
      done()
    })
    myTest.release('runtime error')
  })
})
