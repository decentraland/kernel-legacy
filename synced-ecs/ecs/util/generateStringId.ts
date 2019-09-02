export function generateStringId(seed: number = 0): [string, number] {
  seed >>>= 0
  var s = [0xf1ea5eed, seed, seed, seed]
  function jsf() {
    var e = s[0] - ((s[1] << 27) | (s[1] >>> 5))
    ;(s[0] = s[1] ^ ((s[2] << 17) | (s[2] >>> 15))), (s[1] = s[2] + s[3]), (s[2] = s[3] + e), (s[3] = s[0] + e)
    return s[3] >>> 0
  }
  for (var i = 0; i < 20; i++) jsf()
  const newSeed = jsf()
  return [newSeed.toString(), newSeed]
}
