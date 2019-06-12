import { UnityLoaderType } from '../unity/types'
import DCL from '../unity/DCL'

declare var global: any
declare var UnityLoader: UnityLoaderType

const gameInstance = UnityLoader.instantiate('gameContainer', '/unity/Build/unity.json')

const dcl = new DCL(gameInstance)
global['DCL'] = dcl
