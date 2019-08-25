import { NumberOrRange } from './SceneManifestTypes'
export function decideFloat(x: NumberOrRange) {
  if (typeof x === 'number') {
    return x
  } else {
    return Math.random() * (x[1] - x[0]) + x[0]
  }
}
