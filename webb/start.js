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
fuse.dev({ port: 3000 }) // launch http server
fuse.bundle('vendor').instructions('~ index.tsx')
fuse.bundle('dclclient').instructions('~ dclclient/**/*.ts')
fuse
  .bundle('app')
  .instructions('!> [index.tsx]')
  .watch()
  .hmr()
fuse.run()
