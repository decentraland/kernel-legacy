export type booleanMap = Record<string, boolean>

export function getKeysMappingToTrue(dict: booleanMap) {
  return Object.keys(dict).filter(_ => dict[_] === true)
}
