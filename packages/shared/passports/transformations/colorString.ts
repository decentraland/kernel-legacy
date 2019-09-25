export function hexaNumber(value: number) {
  const result = parseInt(((!value ? 0 : value) * 256).toFixed(0), 10).toString(16)
  if (result.length === 1) {
    return '0' + result
  } else if (result.length > 2) {
    return 'FF'
  }
  return result
}

export function colorString(color: { r: number; g: number; b: number; a: number }) {
  return `#${hexaNumber(color.r)}${hexaNumber(color.g)}${hexaNumber(color.b)}${hexaNumber(
    color.a === 0 || color.a === undefined ? 1 : color.a
  )}`
}
