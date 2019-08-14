describe('simple test with external module', () => {
  const starters = []
  beforeAll(
    /* define global.dcl */ () => {
      global.dcl = {
        loadModule(moduleName) {
          if (moduleName == '@dcl/test')
            return Promise.resolve({
              rpcHandle: '123',
              methods: [
                {
                  name: 'xxx'
                },
                {
                  name: 'zzz'
                }
              ]
            })
          throw new Error('Unknown module ' + moduleName)
        },
        callRpc(moduleHandle, methodName, args) {
          if (moduleHandle !== '123') {
            throw new Error('Unknown module handle ' + moduleHandle)
          }

          if (methodName === 'xxx') {
            return Promise.resolve(args.reduce((a, b) => a + b, 0))
          }

          return Promise.reject(new Error('Unknown method'))
        },
        onStart(cb) {
          starters.push(cb)
        }
      }
      var name = require.resolve('../amd')
      delete require.cache[name]
      require(name)
    }
  )

  it('defines a module that loads other module that loads @dcl/test', done => {
    global.define('test', ['a'], a => {
      try {
        expect(Object.keys(a.exportedTestDCL)).toContain('xxx')
        expect(Object.keys(a.exportedTestDCL)).toContain('zzz')
      } catch (e) {
        done(e)
        return
      }

      a.exportedTestDCL
        .xxx(1, 2, 3, 4)
        .then(r => {
          expect(r).toEqual(10)

          a.exportedTestDCL
            .zzz()
            .then(r => {
              done('didnt fail')
            })
            .catch(() => done())
        })
        .catch(done)
    })

    define('a', ['exports', '@dcl/test'], (exports, testDCL) => {
      exports.exportedTestDCL = testDCL
    })
  })

  afterAll(
    /* starters must not throw */ () => {
      expect(starters.length).toBeGreaterThan(0)
      starters.forEach($ => $())
    }
  )
})

describe('simple test with external module that doesnt exist and throw', () => {
  const starters = []
  beforeAll(
    /* define global.dcl */ () => {
      global.dcl = {
        loadModule(moduleName) {
          if (moduleName == '@throw/test')
            return Promise.resolve({
              rpcHandle: '123',
              methods: [
                {
                  name: 'xxx'
                },
                {
                  name: 'zzz'
                }
              ]
            })
          throw new Error('Unknown module ' + moduleName)
        },
        callRpc(moduleHandle, methodName, args) {
          if (moduleHandle !== '123') {
            throw new Error('Unknown module handle ' + moduleHandle)
          }

          if (methodName === 'xxx') {
            return Promise.resolve(args.reduce((a, b) => a + b, 0))
          }

          return Promise.reject(new Error('Unknown method'))
        },
        onStart(cb) {
          starters.push(cb)
        }
      }

      var name = require.resolve('../amd')
      delete require.cache[name]
      require(name)
    }
  )

  it('defines a module that loads other module that loads @throw/test', done => {
    global.define('test', ['a'], a => {
      try {
        expect(Object.keys(a.exportedTestDCL)).toContain('xxx')
        expect(Object.keys(a.exportedTestDCL)).toContain('zzz')
      } catch (e) {
        done(e)
        return
      }

      a.exportedTestDCL
        .xxx(1, 2, 3, 4)
        .then(r => {
          expect(r).toEqual(10)

          a.exportedTestDCL
            .zzz()
            .then(r => {
              done('didnt fail')
            })
            .catch(() => done())
        })
        .catch(done)
    })

    expect(() =>
      define('a', ['exports', '@throw/test', '@throw/test2', '@throw/tes3'], (exports, testDCL) => {
        exports.exportedTestDCL = testDCL
      })
    ).toThrow()

    done()
  })

  afterAll(
    /* starters must not throw */ () => {
      expect(starters.length).toBeGreaterThan(0)
      expect(() => starters.forEach($ => $())).toThrow()
    }
  )
})
