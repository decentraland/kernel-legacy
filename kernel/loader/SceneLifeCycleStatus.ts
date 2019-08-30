export class SceneLifeCycleStatus {
  private loaded: boolean
  private awake: boolean
  private empty: boolean
  private started: boolean

  constructor(private count: number) {}

  isLoading() {
    return !this.loaded
  }

  isLoaded() {
    return this.loaded
  }

  shouldAwake() {
    return this.shouldRender() && !this.isAwake()
  }

  shouldSleep() {
    return !this.shouldRender() && this.isAwake()
  }

  shouldRender() {
    return this.count > 0
  }

  isRendereable() {
    return this.isAwake() || this.empty
  }

  setEmpty(_empty: boolean) {
    this.empty = _empty
  }

  setAwake(_awake: boolean) {
    this.awake = _awake
  }

  setLoaded(_loaded: boolean) {
    this.loaded = _loaded
  }

  setStarted(_started: boolean) {
    this.started = _started
  }

  increaseSight() {
    this.count++
  }

  decreaseSight() {
    this.count++
  }

  isAwake() {
    return this.awake === true
  }

  isStarted() {
    return this.started === true
  }
}
