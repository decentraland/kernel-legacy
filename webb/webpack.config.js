var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

var cwd = process.env['PWD']

module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(cwd, 'webb', 'tsconfig.json')
      })
    ],
    extensions: ['.js', '.css'],
    modules: [
      path.join(cwd, '..', 'dev.runfiles', 'dcl', 'webb', 'src'),
      path.join(cwd, 'webb', 'src'),
      'node_modules'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      ['dcl']: cwd,
      ['@dcl']: cwd
    }
  },
  mode: 'development',
  entry: {
    main: path.join(cwd, 'webb/src/index.tsx')
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'webb - Experimental Decentraland Client & Information System',
      myPageHeader: 'webb',
      template: './webb/static/index.html',
      path: path.join(cwd, 'webb/dist/'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|png|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './webb/static/'
            }
          }
        ]
      },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(cwd, 'webb/static/'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /.*node_modules[\\/].*/,
          priority: -10
        }
      }
    },
    runtimeChunk: true
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
