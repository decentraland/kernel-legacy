export class TimeSystem {
  public time: number = 0

  constructor() {}

  activate() {
    this.time = 0
  }

  update(dt: number) {
    this.time += dt
  }

  protected now() {
    return this.time
  }
}
