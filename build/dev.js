var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config.js')
var config = require('./config')
var utils = require('./utils')
var express = require('express')
var gulpUtil = require('gulp-util')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var proxyMiddleware = require('http-proxy-middleware')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))

module.exports = function () {
  // web server
  var server = express()
  server.listen(customConfig.devServer.port, customConfig.devServer.host, function (err) {
    var init = 1
    if (err) {
      throw new gulpUtil.PluginError('webpack', err)
    }
    gulpUtil.log(utils.strBordered('Dev Server is running at http://' + customConfig.devServer.host + ':' + customConfig.devServer.port))
    // compiler
    var compiler = webpack(webpackConfig)
    // dev中间件
    server.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }))
    // hot-load中间件
    server.use(webpackHotMiddleware(compiler))
    compiler.plugin('done', function () {
      if (init) {
        // 代理服务
        if (customConfig.devServer.proxy instanceof Function) {
          customConfig.devServer.proxy(server, proxyMiddleware)
        } else if (customConfig.devServer.proxy instanceof Array) {
          customConfig.devServer.proxy.forEach(function (item) {
            server.use(item.path, proxyMiddleware(item.config))
          })
        }
      }
      init = 0
    })
  })
  // 静态资源服务
  server.use(express.static(config.contextAbsolutePath))
  server.engine('ejs', require('ejs').renderFile)
  server.set('views', config.viewsAbsolutePath)
  // Page Router
  customConfig.entryArray.forEach(function (item) {
    server.get(item.router, function (req, res) {
      item.assets = utils.getThisChunkAssets(customConfig, item.name)
      res.render(item.name + '.ejs', item)
    })
  })
}
