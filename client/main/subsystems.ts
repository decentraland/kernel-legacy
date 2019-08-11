import { Observable } from '@dcl/utils'

export type SubsystemStatus =
  | 'Waiting'
  | 'Loading'
  | 'Errored'
  | 'Started'
  | 'Disabled'

export abstract class SubsystemController {
  public status: SubsystemStatus
  public statusObserable = new Observable<SubsystemStatus>()
  public deps: SubsystemController[]
  public name: string
  constructor(name: string, deps: SubsystemController[]) {
    this.name = name
    this.deps = deps
    this.status = 'Waiting'

    for (let dep of deps) {
      dep.statusObserable.add(_ => this.tryStart())
    }
  }

  tryStart() {
    if (this.readyToLoad()) {
      this.status = 'Loading'
      this.statusObserable.notifyObservers('Loading')
      this.onStart()
    }
  }

  readyToLoad() {
    return this.deps.reduce(
      (status, dep) => status && dep.status === 'Started',
      true
    )
  }

  dependencyFailed() {
    return this.deps.filter(dep => dep.status === 'Errored').length > 0
  }

  getStatus(): string {
    if (this.status === 'Started') {
      return `${this.name} is online`
    }
    if (this.status === 'Waiting') {
      return `${this.name} is waiting on deps: [${this.deps.filter(
        dep => dep.status !== 'Started'
      )}]`
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
    this.status = 'Started'
    this.statusObserable.notifyObservers('Started')
  }

  /**
   * Called if the load resulted in an error
   */
  protected onError<T extends Error>(error: T) {
    this.status = 'Errored'
    this.statusObserable.notifyObservers('Errored')
  }
}
