/**
 * 开发模式
 */
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./config.js')
var utils = require('./utils.js')
var baseWebpackConfig = require('./webpack.base.config.js')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))
var hotEntry = 'webpack-hot-middleware/client?http://localhost:' + customConfig.devServer.port + '/&noInfo=true&reload=true'

module.exports = merge(baseWebpackConfig, {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: (function () {
    var map = {}
    customConfig.entryArray.forEach(function (item) {
      map[ item.name ] = [ hotEntry, config.entryAbsolutePath + '/' + item.name + '.js' ]
    })
    return map
  })(),
  output: {
    path: config.distAbsolutePath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [ {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!' + utils.lessLoader(customConfig.styleHash)
    } ]
  },
  plugins: (function () {
    var arr = [
      utils.SkyEyeDefinePlugin('dev', customConfig.defineVars),
      new webpack.HotModuleReplacementPlugin()
    ]
    return arr
  })()
})
