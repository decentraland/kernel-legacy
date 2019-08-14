const path = require('path')
const appPath = require('app-root-path')
appPath.setPath(path.join(process.env.PWD, 'webb'))
process.env.PROJECT_FOLDER = appPath.path
process.env.PROJECT_ROOT = appPath.path
process.env.PROJECT_NODE_MODULES = path.join(process.env.PWD, '..', 'npm', 'node_modules')

const { FuseBox, WebIndexPlugin, JSONPlugin, CSSPlugin, PostCSSPlugin, CSSResourcePlugin } = require('fuse-box')

const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@es6',
  output: 'dist/$name.js',
  modulesFolder: [appPath.resolve('..')],
  cache: true,
  hmr: true,
  alias: {
    components: '~/components',
    modules: '~/modules',
    misc: '~/misc',
    store: '~/store',
    locations: '~/locations',
    reducers: '~/reducers',
    App: '~/App',
    'index.css': '~/index.css'
  },
  plugins: [
    WebIndexPlugin({
      title: 'webb - Experimental Decentraland Client',
      template: 'public/index.html',
      path: 'dist/index.html'
    }),
    JSONPlugin(),
    [
      PostCSSPlugin([require('postcss-import')]),
      CSSResourcePlugin({
        dist: 'dist/css-resources'
      }),
      CSSPlugin()
    ]
  ]
})
fuse.dev({ root: 'dist/', port: 3000, fallback: '/index.html' }) // launch http server
fuse.register('@dcl/config', {
  homeDir: '../config',
  main: 'index.ts',
  instructions: '**/**.ts'
})
fuse.register('@dcl/utils', {
  homeDir: '../utils',
  main: 'index.ts',
  instructions: '**/**.ts'
})
fuse.register('@dcl/client', {
  homeDir: '../client',
  main: 'index.ts',
  instructions: '**/**.ts'
})
fuse.register('@dcl/protos', {
  homeDir: '../protos/package',
  main: 'index.js',
  instructions: '**/**.js'
})
fuse
  .bundle('dcl')
  .instructions('+ [@dcl/client] + [@dcl/utils] + [@dcl/config]')
  .hmr()
  .watch()
fuse.bundle('vendor').instructions('~ index.tsx - [@dcl/client]')
fuse
  .bundle('app')
  .instructions('!> [index.tsx]')
  .hmr()
  .watch()
const running = fuse.run()

function watchStdin(action) {
  process.stdin.resume()
  process.stdin.on('data', async function() {
    action()
    // fuse.sendPageReload()
  })
  process.stdin.on('end', function() {
    fuse.exit()
  })
}
if (process.env.IBAZEL_NOTIFY_CHANGES) {
  running.then(producer => {
    watchStdin(() => 1)
  })
}
