/**
 * 开发模式
 */
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./config.js')
var utils = require('./utils.js')
var baseWebpackConfig = require('./webpack.base.config.js')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var packJson = require(config.libEnvAbsolutePath + '/package.json')
var filename = packJson.name.split('/').pop()
var library = filename

module.exports = function (options) {
  var isMin = options.min
  var cssFileName = '[name].css'
  var plugins = [
    utils.SkyEyeDefinePlugin('pro', customConfig.defineVars),
    new webpack.optimize.DedupePlugin()
  ]
  if (isMin) {
    filename += '.min'
    cssFileName = '[name].min.css'
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          cascade: false
        }
      })
    )
  }
  var extractCSS = new ExtractTextPlugin(cssFileName, { allChunks: true })
  plugins.push(extractCSS)
  return merge(baseWebpackConfig, {
    devtool: 'cheap-source-map',
    entry: {
      'lib': config.libEnvAbsolutePath + '/index.js'
    },
    output: {
      path: config.libEnvAbsolutePath + '/dist',
      filename: filename + '.js',
      chunkFilename: '[name].js',
      sourceMapFilename: '[file].map',
      library: library,
      libraryTarget: 'umd'
    },
    module: {
      loaders: [ {
        test: /\.css$/,
        loader: extractCSS.extract('style-loader', 'css-loader')
      }, {
        test: /\.less$/,
        loader: extractCSS.extract('style-loader', utils.lessLoader(customConfig.styleHash))
      } ]
    },
    plugins: plugins
  })
}
