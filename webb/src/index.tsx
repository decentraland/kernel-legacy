import { default as App } from './App'

import { setStatefulModules } from './hmr'

import 'index.css'
import 'decentraland-ui/lib/styles.css'

setStatefulModules('hmr', 'App', 'store', 'kernel')
App()
