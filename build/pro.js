var webpack = require('webpack')
var webpackConfig = require('./webpack.pro.config.js')
var utils = require('./utils')
var config = require('./config')
var grunt = require('grunt')
var gulpUtil = require('gulp-util')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))

module.exports = function (callback) {
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

      // externals
      customConfig.externals.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // favicon
      customConfig.assets.favicon.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // css
      customConfig.assets.css.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // render html
      customConfig.entryArray.forEach(function (item) {
        item.assets = utils.getThisChunkAssets(customConfig, item.name)
        utils.renderEjsToHtml(config.viewsAbsolutePath + '/' + item.name + '.ejs', item, function (err, str) {
          if (err) {
            throw new gulpUtil.PluginError('webpack', err)
          } else {
            grunt.file.write(config.templatesAbsolutePath + '/' + item.name + '.html', str)
          }
        })
      })
      callback()
    }
  })
}
