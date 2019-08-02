var path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: './webb/src/index.js',
  output: {
    filename: 'bundle.js',
    path: './webb/static/',
    publicPath: '/static/'
  },
  devServer: {
    stats: {
      assets: false,
      hash: false,
      chunks: false,
      errors: true,
      errorDetails: true
    },
    overlay: true
  }
}
