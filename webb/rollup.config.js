const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const builtins = require('rollup-plugin-node-builtins')
const json = require('rollup-plugin-json')
const css = require('rollup-plugin-css-only')
const path = require('path')
const typescriptPlugin = require('rollup-plugin-typescript')
const typescript = require('typescript')

module.exports = {
  input: './src/index.tsx',
  output: {
    file: './static/index.js'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    commonjs({
      include: [
        'node_modules/**',
        path.join(__dirname, '..', '..', 'npm', 'node_modules') + '/**'
      ],
      exclude: ['node_modules/rollup-plugin-node-builtins/src/es6/**'],
      namedExports: {
        'node_modules/decentraland-ui/lib/index.js': [
          'Page',
          'Field',
          'Button',
          'Navbar',
          'Menu',
          'Popup',
          'Atlas',
          'Layer',
          'Grid',
          'Address',
          'HeaderMenu',
          'Icon',
          'Loader',
          'Tabs',
          'Header',
          'Segment',
          'Hero',
          'Form',
          'InputOnChangeData',
          'Center',
          'Modal'
        ],
        'node_modules/react-is/index.js': [
          'isValidElementType',
          'isContextConsumer'
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'unstable_batchedUpdates'
        ],
        'node_modules/react-redux/index.js': ['connect'],
        'node_modules/react/index.js': [
          'Component',
          'PropTypes',
          'createElement',
          'PureComponent',
          'useContext',
          'useMemo',
          'useEffect',
          'useLayoutEffect',
          'useRef',
          'useReducer'
        ]
      }
    }),
    css({
      output: './static/bundle.css'
    }),
    nodeResolve({
      dedupe: ['react', 'react-dom', 'readable-stream'],
      preferBuiltins: true
    }),
    builtins(),
    json(),
    typescriptPlugin({
      typescript,
      importHelpers: true
    })
  ]
}
