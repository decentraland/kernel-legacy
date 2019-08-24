/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/// <reference types="node"/>
/// <reference lib="es2017"/>

import { Extractor, ExtractorConfig, IConfigFile } from '@microsoft/api-extractor'
import * as fs from 'fs'
import * as path from 'path'
import ts from 'typescript'

function fileInSameFolderWithName(tsConfig: string, filename: string) {
  return path.join(path.dirname(path.resolve(tsConfig)), filename)
}

const DEBUG = true

export function findUtils(dirPath: string): string[] {
  const files = fs.readdirSync(dirPath)
  const result: string[] = []
  for (let file of files) {
    if (file.endsWith('.ts')) {
      result.push(path.join(dirPath, file))
    } else if (fs.statSync(path.join(dirPath, file)).isFile) {
    } else {
      result.push(...findUtils(path.join(dirPath, file)))
    }
  }
  return result
}

export function runMain(tsConfig: string, entryPoint, dtsBundleOut): 1 | 0 {
  try {
    const data = JSON.parse(fs.readFileSync(path.resolve(tsConfig)).toString())
    const config = ts.parseJsonConfigFileContent(data, ts.sys, '.')
    console.log(config)
  } catch (errors) {
    console.error(errors)
    return 1
  }
  const targetPackageJsonPath = path.resolve(path.join(path.dirname(entryPoint), 'package.json'))

  if (!fs.existsSync(targetPackageJsonPath)) {
    fs.writeFileSync(
      targetPackageJsonPath,
      JSON.stringify({
        name: 'GENERATED-BY-BAZEL',
        version: '0.0.0',
        description: 'This is a dummy package.json as API Extractor always requires one.'
      })
    )
  }

  const extractorConfigFile = path.resolve(path.dirname(entryPoint), 'api-extractor.json')
  const extractorConfigData = JSON.parse(fs.readFileSync(extractorConfigFile).toString()) as IConfigFile
  extractorConfigData.mainEntryPointFilePath = entryPoint
  extractorConfigData.projectFolder = path.dirname(entryPoint)
  extractorConfigData.dtsRollup.publicTrimmedFilePath = dtsBundleOut
  extractorConfigData.dtsRollup.betaTrimmedFilePath = fileInSameFolderWithName(dtsBundleOut, 'beta.d.ts')
  delete extractorConfigData.dtsRollup.untrimmedFilePath
  extractorConfigData.dtsRollup.omitTrimmingComments = true
  extractorConfigData.projectFolder = process.env.PWD
  extractorConfigData.docModel.apiJsonFilePath = fileInSameFolderWithName(entryPoint, 'scene-api-docs.json')
  extractorConfigData.apiReport.enabled = false
  extractorConfigData.apiReport.reportFileName = '.'
  extractorConfigData.tsdocMetadata.enabled = true
  extractorConfigData.tsdocMetadata.tsdocMetadataFilePath = fileInSameFolderWithName(
    entryPoint,
    'scene-api-tsdoc-metadata.json'
  )

  const extractorConfig = ExtractorConfig.prepare({
    configObject: extractorConfigData,
    configObjectFullPath: undefined,
    packageJsonFullPath: targetPackageJsonPath
  })

  const extractor = Extractor.invoke(extractorConfig, { showDiagnostics: true })
  const isSuccessful = extractor.succeeded

  // API extractor errors are emitted by it's logger.
  return isSuccessful ? 0 : 1
}

// Entry point
if (require.main === module) {
  if (DEBUG) {
    console.error(`
api-extractor: running with
  cwd: ${process.cwd()}, ${process.env.PWD}
  argv:
    ${process.argv.join('\n    ')}
  `)
  }

  const tsConfig = process.argv[2]
  const entryPoint = process.argv[3]
  const dtsBundleOut = fileInSameFolderWithName(tsConfig, 'scene-api.d.ts')

  runMain(tsConfig, entryPoint, dtsBundleOut)
}
