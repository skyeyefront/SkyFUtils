/**
 * Created by huangxinxin on 16/7/11.
 * Access Log
 */
var fs = require('fs')
var path = require('path')
var morgan = require('morgan')
var FileStreamRotator = require('file-stream-rotator')
var setting = require('./setting.js')

module.exports = function (app) {
  var accessLogDirectory = setting.logs.access.path.absolute
  fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory)
  var accessLogStream = FileStreamRotator.getStream({
    filename: path.join(accessLogDirectory, 'Access-%DATE%.log'),
    date_format: 'YYYY-MM-DD',
    frequency: 'daily',
    verbose: false
  })
  app.use(morgan('combined', { stream: accessLogStream }))
}
