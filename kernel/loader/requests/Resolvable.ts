import { IFuture } from 'fp-future'

export interface Resolvable<T> {
  key: string
  loading: boolean
  error: boolean
  success: boolean
  data: T | undefined
  promise: IFuture<T | undefined>
}
