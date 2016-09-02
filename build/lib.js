/**
 * Created by huangxinxin on 16/9/1.
 */
var webpack = require('webpack')
var gulpUtil = require('gulp-util')

module.exports = function (options, callback) {
  if (!(options instanceof Object)) {
    options = {}
  }
  var webpackConfig = require('./webpack.lib.config.js')(options)
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err)
    } else {
      gulpUtil.log('[webpack]\n',
        stats.toString({
          hash: true,
          version: true,
          timings: true,
          assets: true,
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkOrigins: false,
          chunkModules: false,
          errorDetails: true
        }) + '\n'
      )
      callback()
    }
  })
}
