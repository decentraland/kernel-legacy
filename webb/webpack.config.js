var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
var package = require('./package.json')

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: path.join(process.cwd(), 'webb/src/index.js'),
    vendor: Object.keys(package)
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'shared',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'webb - Experimental Decentraland Client & Information System',
      myPageHeader: 'webb',
      template: './static/index.html',
      chunks: ['vendor', 'app'],
      path: path.join(process.cwd(), 'webb/dist/'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
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
