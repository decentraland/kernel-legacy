import { ISceneRunningScript } from '../../types/ISceneRunningScript'

export function generateSceneScriptLifecycleManager(that: ISceneRunningScript) {
  return {
    onStart(cb: Function) {
      that.onStartFunctions.push(cb)
    },

    /** update tick */
    onUpdate(cb: (deltaTime: number) => void): void {
      if (typeof (cb as any) !== 'function') {
        that.onError(new Error('onUpdate must be called with only a function argument'))
      } else {
        that.onUpdateFunctions.push(cb)
      }
    },

    /** event from the engine */
    onEvent(cb: (event: any) => void): void {
      if (typeof (cb as any) !== 'function') {
        that.onError(new Error('onEvent must be called with only a function argument'))
      } else {
        that.onEventFunctions.push(cb)
      }
    }
  }
}
