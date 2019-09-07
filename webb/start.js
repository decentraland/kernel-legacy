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
  cache: true,
  watch: true,
  hmr: true,
  sourceMap: false,
  alias: {
    components: '~/components',
    modules: '~/modules',
    misc: '~/misc',
    store: '~/store',
    locations: '~/locations',
    reducers: '~/reducers',
    'App.js': '~/App',
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

fuse.register('@dcl/config', {
  homeDir: '../config',
  main: 'index.js',
  instructions: '../config/package/**'
})
fuse.register('@dcl/utils', {
  homeDir: '../utils/package',
  main: 'index.js',
  instructions: '../utils/package/**'
})
fuse.register('@dcl/kernel', {
  homeDir: '../kernel/package',
  main: 'index.js',
  instructions: '../kernel/package/**'
})
fuse.register('@dcl/protos', {
  homeDir: '../protos/package',
  main: 'index.js',
  instructions: '../protos/package/**'
})
fuse.register('@dcl/rpc', {
  homeDir: '../rpc/package',
  main: 'index.js',
  instructions: '../rpc/package/**'
})

fuse.dev({ root: 'dist/', port: 3000, fallback: '/index.html' }) // launch http server

fuse.bundle('vendor').instructions('~ index.tsx')
fuse
  .bundle('app')
  .instructions('!> [index.tsx]')
  .watch()
  .hmr()
const run1 = fuse.run()

function watchStdin(action) {
  process.stdin.resume()
  process.stdin.on('data', async function() {
    action()
  })
  process.stdin.on('end', function() {
    fuse.exit()
  })
}
if (process.env.IBAZEL_NOTIFY_CHANGES) {
  Promise.all([run1]).then(producer => {
    watchStdin(() => 1)
  })
}
