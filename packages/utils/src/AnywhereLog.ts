/**
 * @module AnywhereLog
 * @description Log functions that work despite what the context is (scene script or not)
 */

declare var console: any
declare var dcl: any

/**
 * @param args - any loggable parameter
 * @public
 */
export function log(...args: any[]) {
  if (typeof dcl !== 'undefined') {
    dcl.log(...args)
  } else {
    // tslint:disable-next-line:no-console
    console.log('DEBUG:', ...args)
  }
}

/**
 * @param error - string or Error object.
 * @param data - any debug information.
 * @public
 */
export function error(error: string | Error, data?: any) {
  if (typeof dcl !== 'undefined') {
    dcl.error(error, data)
  } else {
    // tslint:disable-next-line:no-console
    console.error('ERROR:', error, data)
  }
}
