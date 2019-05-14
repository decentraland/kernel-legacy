import * as path from 'path'
import { spawn } from 'child_process'

import * as fs from 'fs-extra'
import glob = require('glob')

const PWD = process.cwd()

const env = {
  ...process.env,
  AMD_PATH: `${PWD}/node_modules/dcl-amd/dist/amd.js`,
  ECS_PACKAGE_JSON: `${PWD}/packages/decentraland-ecs/package.json`,
  ECS_PATH: `${PWD}/packages/decentraland-ecs/dist/src/index.js`
}

const folders = glob
    .sync(path.resolve(__dirname, '../public/ecs-parcels/*/game.ts'), { absolute: true })
    .map($ => path.dirname($))

async function main () {
  const [folderDates, ecsStatsExists] = await Promise.all([
    getLastModificationOfFolders(folders),
    fs.pathExists('ecs-stats.json')
  ])

  let targetFolders = folders
  if (!ecsStatsExists) {
    await fs.writeFile('ecs-stats.json', JSON.stringify(folderDates))
  } else {
    const previousDates = await fs.readJSON('ecs-stats.json')
    targetFolders = folders.filter(folder => {
      return previousDates[folder] !== (folderDates[folder] as Date).toISOString()
    })
  }

  console['log'](`Detected ${targetFolders.length} projects to be compiled.`)

  targetFolders.map($ => {
    spawn('node', [`${PWD}/packages/build-ecs/index.js`, ...process.argv], {
      cwd: $,
      env,
      stdio: 'inherit'
    }).ref()
  })
}

async function getLastModificationOfFolders(folders: string[]): Promise<any> {
  const result = {}
  const folderStats = await Promise.all(folders.map(folder => fs.stat(folder)))
  folderStats.forEach((stat, i) => {
    result[folders[i]] = stat.mtime
  })
  return result
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
