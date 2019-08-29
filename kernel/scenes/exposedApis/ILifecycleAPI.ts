export interface ILifecycleAPI {
  /**
   * Start signal, sent after the initial ECS snapshot was set up
   */
  startSignal(): Promise<void>
}
