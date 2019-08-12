import { Observable } from '@dcl/utils'

export type SubsystemStatus = 'UserWaiting' | 'Waiting' | 'Loading' | 'Errored' | 'Started' | 'Disabled'

export abstract class SubsystemController {
  _status: SubsystemStatus
  public statusObservable = new Observable<SubsystemStatus>()
  public deps: SubsystemController[]
  public name: string
  constructor(deps: SubsystemController[]) {
    this.deps = deps
    this._status = 'Waiting'

    for (let dep of deps) {
      dep.statusObservable.add(_ => this.tryStart())
    }
  }

  get status(): string {
    if (this._status === 'Started') {
      return 'Online'
    }
    if (this.readyToLoad()) {
      return 'Ready to load'
    }
    if (this.dependencyFailed()) {
      return `Waiting on deps: ${this.pendingDeps}`
    }
    return this._status
  }

  get pendingDeps() {
    return this.deps.filter(dep => dep._status !== 'Started').join(', ')
  }

  tryStart() {
    if (this.readyToLoad()) {
      if (this._status !== 'Loading') {
        this._status = 'Loading'
        this.statusObservable.notifyObservers('Loading')
        this.onStart()
      }
    }
  }

  readyToLoad() {
    return this.deps.reduce((status, dep) => status && dep._status === 'Started', true)
  }

  dependencyFailed() {
    return this.deps.filter(dep => dep._status === 'Errored').length > 0
  }

  getStatus(): string {
    if (this.status === 'Started') {
      return `${this.name} is online`
    }
    if (this.status === 'Waiting') {
      return `${this.name} is waiting on deps: [${this.pendingDeps}]`
    }
    return `${this.name}: ${this.status}`
  }

  /**
   * TL;DR: Override this, and call `onSuccess` or `onError`
   *
   * Called externally by the MainController: signals that the subsystem should try to come online
   */
  protected abstract onStart()

  /**
   * Called if the load was successful
   */
  protected onSuccess() {
    this._status = 'Started'
    this.statusObservable.notifyObservers('Started')
  }

  /**
   * Called if the load resulted in an error
   */
  protected onError<T extends Error>(error: T) {
    this._status = 'Errored'
    this.statusObservable.notifyObservers('Errored')
  }
}
