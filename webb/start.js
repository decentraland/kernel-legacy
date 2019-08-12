const path = require('path')
const appPath = require('app-root-path')
appPath.setPath(path.join(process.env.PWD, '..', 'dcl', 'webb'))
process.env.PROJECT_FOLDER = appPath.path
process.env.PROJECT_ROOT = appPath.path
process.env.PROJECT_NODE_MODULES = appPath.resolve('node_modules')

const {
  FuseBox,
  WebIndexPlugin,
  JSONPlugin,
  SassPlugin,
  CSSPlugin,
  PostCSSPlugin,
  CSSResourcePlugin
} = require('fuse-box')

const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@es6',
  output: 'dist/$name.js',
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
      SassPlugin(),
      CSSResourcePlugin({
        dist: 'dist/css-resources'
      }),
      CSSPlugin()
    ]
  ]
})
fuse.dev({ root: 'dist/', port: 3000, fallback: '/index.html' }) // launch http server
fuse
  .bundle('vendor')
  .instructions('~ index.tsx')
  .sourceMaps(true)
fuse
  .bundle('app')
  .instructions('!> [index.tsx]')
  .watch()
  .hmr()
const running = fuse.run()

function watchStdin(action) {
  process.stdin.resume()
  process.stdin.on('data', async function(chunk) {
    fuse.sendPageReload()
  })
  process.stdin.on('end', function() {
    fuse.exit()
  })
}
if (process.env.IBAZEL_NOTIFY_CHANGES) {
  running.then(producer => {
    watchStdin(() => producer.reset() && producer.run())
  })
}
