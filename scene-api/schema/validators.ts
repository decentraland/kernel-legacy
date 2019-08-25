import { defaultLogger } from '@dcl/utils'

import { UIValue } from '../ecs/UIValue'
import { UIStackOrientation } from '../engine/UIShapes'
import { ReadOnlyVector2, ReadOnlyVector3, Color3, ReadOnlyColor3, Color4, ReadOnlyQuaternion } from '@dcl/utils'

export type ISchema<Keys> = { [key: string]: { type: keyof Keys; default?: any } }
export type Validator<T = any> = (x: any, defaultValue: T) => T

export const validators = {
  int(x: any, def: number) {
    if (x === null || x === undefined) return def
    if (typeof x === 'number' && isFinite(x)) return x | 0
    try {
      const tmp = parseInt(x, 10)
      if (isFinite(tmp)) return tmp | 0
    } catch (e) {
      return def | 0
    }
    return def | 0
  },

  float(x: any, def: number): number {
    if (x === null || x === undefined) return def
    if (typeof x === 'number' && isFinite(x)) return x
    try {
      const tmp = parseFloat(x)
      if (isFinite(tmp)) return tmp
    } catch (e) {
      return def
    }
    return def
  },

  number(x: any, def: number) {
    if (typeof x === 'number' && isFinite(x)) return x
    try {
      const tmp = parseFloat(x)
      if (isFinite(tmp)) return tmp
    } catch (e) {
      return def
    }
    return def
  },

  boolean(x: any, def: boolean): boolean {
    if (x === null || x === undefined) return def
    if (x === false || x === 'false' || x === 0 || x === '') {
      return false
    } else if (x === true || x === 'true') {
      return true
    } else if (isFinite(x)) {
      return parseFloat(x) !== 0
    }
    return def
  },

  string(x: any, def: string): string {
    if (x === null || x === undefined) return def
    const type = typeof x
    if (type === 'string') {
      return x
    }

    if (x != null && type === 'object') {
      return x.toString()
    }

    if (x === null || x === undefined) {
      return def
    }

    return String(x)
  },

  vector2(value: any, def: ReadOnlyVector2): ReadOnlyVector2 {
    if (value === null || value === undefined) return def

    if (Number.isFinite(value)) {
      return { x: value, y: value }
    }

    const validType = value != null && typeof value === 'object' && 'x' in value && 'y' in value
    const validNumbers = validType && Number.isFinite(value.x) && Number.isFinite(value.y)

    if (validNumbers) {
      return value
    } else {
      return def
    }
  },

  vector3(value: any, def: ReadOnlyVector3): ReadOnlyVector3 {
    if (value === null || value === undefined) return def

    if (Number.isFinite(value)) {
      return { x: value, y: value, z: value }
    }

    const validType = value != null && typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value
    const validNumbers = validType && Number.isFinite(value.x) && Number.isFinite(value.y) && Number.isFinite(value.z)

    if (validNumbers) {
      return value
    } else {
      return def
    }
  },

  UIStackOrientation(value: any, def: UIStackOrientation.VERTICAL) {
    if (value === null || value === undefined || (value.type !== Number && value.type !== UIStackOrientation)) {
      return def
    }

    return value
  },

  uiValue(value: any, def: UIValue): {} {
    if (value === null || value === undefined) return def

    if (value instanceof UIValue) {
      return value.toString()
    }

    if (typeof value === 'number') {
      return new UIValue(value)
    }

    if (typeof value === 'string') {
      return new UIValue(value)
    }

    return def
  },

  quaternion(value: any, def: ReadOnlyQuaternion): ReadOnlyQuaternion {
    if (value === null || value === undefined) return def

    if (Number.isFinite(value)) {
      return { x: value, y: value, z: value, w: value }
    }

    const validType =
      value != null && typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value && 'w' in value
    const validNumbers =
      validType &&
      Number.isFinite(value.x) &&
      Number.isFinite(value.y) &&
      Number.isFinite(value.z) &&
      Number.isFinite(value.w)

    if (validNumbers) {
      return value
    } else {
      return def
    }
  },

  color(x: any, def: ReadOnlyColor3) {
    if (x === null || x === undefined) return def
    const color = Color3.Black()
    if (typeof x === 'string') {
      const v = x.trim()
      if (v.startsWith('#')) {
        color.copyFrom(Color3.FromHexString(x))
      } else {
        // tslint:disable-next-line:no-console
        defaultLogger.warn('Cannot parse color3', x)
      }
    } else if (typeof x === 'object' && (x.r !== undefined && x.g !== undefined && x.b !== undefined)) {
      color.copyFrom(x)
    } else if (typeof x === 'number') {
      color.copyFrom(Color3.FromHexString('#' + ('000000' + (x | 0).toString(16)).substr(-6)))
    } else {
      // tslint:disable-next-line:no-console
      defaultLogger.warn('Cannot parse color3', x)
    }
    return color
  },

  color4(x: any, def: Color3) {
    if (x === null || x === undefined) return def
    const color = new Color4(0, 0, 0, 1)
    if (typeof x === 'string') {
      const v = x.trim()
      if (v.startsWith('#')) {
        color.copyFrom(Color4.FromHexString(x))
      } else {
        // tslint:disable-next-line:no-console
        defaultLogger.warn('Cannot parse color4', x)
      }
    } else if (typeof x === 'object' && (x.r !== undefined && x.g !== undefined && x.b !== undefined)) {
      color.copyFrom(x)
    } else if (typeof x === 'number') {
      color.copyFrom(Color4.FromHexString('#' + ('00000000' + (x | 0).toString(16)).substr(-8)))
    } else {
      // tslint:disable-next-line:no-console
      defaultLogger.warn('Cannot parse color4', x)
    }
    return color
  },

  side(val: any, def: number) {
    if (val === 0 || val === 1 || val === 2) {
      return val
    }
    if (val === 'back') {
      return 'back'
    } else if (val === 'double') {
      return 'double'
    } else if (val === 'front') {
      return 'front'
    }

    return def
  },

  floatArray(x: any, def: number[]) {
    let ret: number[] = []
    if (x === null || x === undefined || x.length === 0 || x.constructor !== Array) return def
    for (let i = 0; i < x.length; i++) {
      ret.push(validators.float(x[i], 0))
    }
    return ret
  }
}

export function createSchemaValidator(schema: ISchema<typeof validators>) {
  const schemaKeys = Object.keys(schema)

  return Object.assign(
    function(input: any) {
      if (input != null && typeof input === 'object') {
        for (let k = 0; k < schemaKeys.length; k++) {
          const key = schemaKeys[k]
          if (key in input) {
            input[key] = (validators[schema[key].type] as Validator)(input[key], schema[key].default)
          } else if (typeof schema[key].default !== 'undefined') {
            input[key] = schema[key].default
          }
        }
        return input
      } else {
        return null
      }
    },
    { schema, schemaKeys }
  )
}
