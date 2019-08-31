import future from 'fp-future'
import { Resolvable } from './Resolvable'

export abstract class ResolutionSystem<T> {
  record = new Map<string, Resolvable<T>>()
  hasStartedResolving(key: string) {
    return this.record.has(key)
  }
  hasFinishedResolving(key: string) {
    const record = this.record.get(key)
    if (!record) {
      return false
    }
    return !record.loading
  }
  storeResolution(x: string, v: T) {
    const promiseOfValue = future<T>()
    promiseOfValue.resolve(v)
    this.record.set(x, {
      key: x,
      loading: false,
      error: false,
      success: true,
      data: v,
      promise: promiseOfValue
    })
  }
  resolve(x: string): Promise<T | undefined> {
    if (!this.record.has(x)) {
      const resolvable = {
        key: x,
        loading: true,
        error: false,
        success: false,
        data: undefined,
        promise: future<T>()
      }
      this.record.set(x, resolvable)
      const handleError = (err: any) => {
        resolvable.loading = false
        resolvable.error = err
        resolvable.success = false
        resolvable.promise.resolve(undefined)
      }
      const handleSuccess = (data: T) => {
        resolvable.loading = false
        resolvable.success = true
        resolvable.data = data
        resolvable.promise.resolve(data)
      }
      try {
        this.executeResolution(x)
          .then(d => {
            try {
              if (resolvable.promise.isPending) {
                handleSuccess(d)
                if (d) {
                  this.processResolution(x, d)
                }
              }
            } catch (e) {
              handleError(e)
            }
          })
          .catch(handleError)
      } catch (e) {
        handleError(e)
      }
      return resolvable.promise
    } else {
      return this.record.get(x).promise
    }
  }
  abstract executeResolution(x: string): Promise<T | undefined>
  abstract processResolution(x: string, r: T): void
}
