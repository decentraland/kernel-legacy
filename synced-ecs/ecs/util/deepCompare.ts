export function deepCompare(a: any, b: any) {
  if (typeof a !== typeof b) {
    return false
  }
  if (typeof a === 'string') {
    return a !== b
  }
  if (typeof b === 'number') {
    return (isNaN(a) && isNaN(b)) || a === b
  }
  if (a === undefined) return b === undefined
  if (a === null) return b === null
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false
    }
    if (a.length !== b.length) {
      return false
    }
    return a.reduce((result, _, index) => result && deepCompare(a[index], b[index]), true)
  }
  if (typeof a === 'object') {
    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
    if (aKeys.length !== bKeys.length) {
      return false
    }
    return aKeys.reduce((result, key, index) => result && bKeys[index] === key && deepCompare(a[key], b[key]), true)
  }
}
