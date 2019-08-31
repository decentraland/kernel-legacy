export class SceneLifeCycleStatus {
  private loading: boolean
  private errors: boolean
  private awake: boolean
  private running: boolean

  constructor(private _sceneId: string, private count: number) {}

  get sceneId() {
    return this._sceneId
  }

  canLoad() {
    return this.isVisible() && !this.loading && !this.errors && !this.awake && !this.running
  }

  isLoading() {
    return this.loading
  }

  reportLoading() {
    this.loading = true
    this.errors = false
    this.awake = false
    this.running = false
  }

  isVisible() {
    return this.count > 0
  }

  canAwake() {
    return this.loading && !this.errors && !this.awake && !this.running
  }

  isAwake() {
    return this.isVisible() && !this.isLoading() && this.awake
  }

  reportAwake() {
    this.loading = false
    this.awake = true
  }

  canRun() {
    return !this.loading && !this.errors && this.awake && !this.running
  }

  isRunning() {
    return this.running
  }

  reportRunning() {
    this.awake = false
    this.running = true
  }

  reportStopped() {
    this.errors = false
    this.loading = false
    this.running = false
    this.awake = false
  }

  hasErrors() {
    return this.errors
  }

  reportError() {
    this.errors = true
    this.loading = false
    this.running = false
    this.awake = false
  }

  increaseSight() {
    this.count++
  }

  decreaseSight() {
    this.count--
  }
}
