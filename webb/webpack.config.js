var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: path.join(process.cwd(), 'webb/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'webb/static/'),
    publicPath: '/static/'
  },
  devServer: {
    hot: true,
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
