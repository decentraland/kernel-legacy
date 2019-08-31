export function webpackGamekit() {
  const gamekitWorkerRaw = require('raw-loader!../../../static/systems/scene.system.js')
  return makeUrlFromBlob(gamekitWorkerRaw)
}

export function makeUrlFromBlob(_: any) {
  const gamekitWorkerBLOB = new Blob([_])
  const gamekitWorkerUrl = URL.createObjectURL(gamekitWorkerBLOB)
  return gamekitWorkerUrl
}

export function fsGamekit(path: string) {
  const fs = require('fs')
  return URL.createObjectURL(fs.readFileSync(path).toString())
}
