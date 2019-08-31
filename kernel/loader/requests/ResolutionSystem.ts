import future from 'fp-future'
import { Resolvable } from './Resolvable'

export abstract class ResolutionSystem<T, R> {
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
        resolvable.error = true
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
                if (d) {
                  handleSuccess(this.processResolution(x, d))
                } else {
                  handleSuccess(undefined)
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
  abstract executeResolution(x: string): Promise<R | undefined>
  abstract processResolution(x: string, r: R): T
}
