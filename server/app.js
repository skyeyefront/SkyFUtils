var setting = require('./setting')
var config = require('../build/config')
var utils = require('../build/utils')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))
var gulpUtil = require('gulp-util')
var express = require('express')
var server = express()
// service
server.listen(setting.port, setting.host, function (err) {
  if (err) {
    throw new gulpUtil.PluginError('express', err)
  }
  gulpUtil.log(utils.strBordered('Server is running at http://' + setting.host + ':' + setting.port))
})
// 静态资源服务
server.use(config.distPublicPath, express.static(config.distProAbsolutePath))
server.set('views', config.templatesAbsolutePath)
server.engine('html', require('ejs').renderFile)
// Page Router
customConfig.entryArray.forEach(function (item) {
  server.get(item.router, function (req, res) {
    res.render(item.name + '.html')
  })
})
