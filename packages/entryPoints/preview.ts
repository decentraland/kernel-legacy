declare var global: any
declare var window: any
declare var UnityLoader: UnityLoaderType

global['preview'] = window['preview'] = true

import { UnityLoaderType } from '../unity/types'
import DCLPreview from '../unity/preview/DCLPreview'

const gameInstance = UnityLoader.instantiate('gameContainer', '/unity/Build/unity.json')

const dcl = new DCLPreview(gameInstance)
global['DCL'] = dcl
