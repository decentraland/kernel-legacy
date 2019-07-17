let lastGeneratedId = 0

/**
 * Generates a new prefixed id
 * @beta
 */
export function newId(type: string) {
  lastGeneratedId++
  if (type.length === 0) throw new Error('newId(type: string): type cannot be empty')
  return type + lastGeneratedId.toString(36)
}
