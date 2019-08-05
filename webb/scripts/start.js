const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('dcl/webb/webpack.config')
const dirTree = require('directory-tree')
function spaceTimes(num) {
  return Array.from(new Array(num)).join(' ')
}
function tr(tree, spaces) {
  if (tree.type === 'directory') {
    if (spaces > 4) return `${spaceTimes(spaces)}${tree.name}: ...`
    return (
      `${spaceTimes(spaces)}${tree.name}:\n` +
      tree.children.map(child => tr(child, spaces + 2)).join('\n')
    )
  } else {
    return `${spaceTimes(spaces)}${tree.name}`
  }
}
console.log(
  `Current working dir: ${process.cwd()};\nEnv: ${JSON.stringify(
    process.env,
    null,
    2
  )}`
)
//  list: ${tr(dirTree('.'), 0)}`)
// Current working dir: /private/var/tmp/_bazel_usr/3299de0f7d8e61231424aa960e1f34f6/
//   execroot/dcl/
//     bazel-out/darwin-fastbuild/bin/
//       webb/dev.runfiles/dcl

const compiler = Webpack(webpackConfig)
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
  stats: {
    colors: true
  }
})
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080')
})
