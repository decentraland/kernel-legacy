export const LOADING = 'loading'
export const AWAKE = 'awake'
export const RUNNING = 'running'
export const STOPPED = 'stopped'

export type SceneStatus = typeof LOADING | typeof AWAKE | typeof RUNNING | typeof STOPPED
