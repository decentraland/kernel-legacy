const {
  FuseBox,
  WebIndexPlugin,
  JSONPlugin,
  SassPlugin,
  CSSPlugin,
  PostCSSPlugin,
  CSSResourcePlugin
} = require('fuse-box')

FuseBox.init({
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
      template: 'public/fuse.html'
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

task('default', context => {
  const fuse = context.getConfig()

  fuse.dev({ port: 3000 }) // launch http server

  const dclBundle = fuse
    .bundle('dcl')
    .instructions('~ dummy-vendor.ts')
    .watch('../node_modules/@dcl')
  const vendorBundle = fuse
    .bundle('vendor')
    .instructions('~ index.tsx')
    .sourceMaps(true)
  const page = fuse
    .bundle('app')
    .instructions('!> [index.tsx]')
    .watch('./')
    .hmr()
  fuse.run()

  function watchStdin() {
    process.stdin.resume()
    process.stdin.on('data', async function(chunk) {
      await context.bundle(dclBundle)
      fuse.sendPageReload()
    })
    process.stdin.on('end', function() {
      fuse.exit()
    })
  }
  if (process.env.IBAZEL_NOTIFY_CHANGES) {
    watchStdin()
  }
})
