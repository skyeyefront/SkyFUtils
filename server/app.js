// 依赖加载
var setting = require('./setting')
var config = require('../build/config')
var utils = require('../build/utils')
var customConfig = utils.mergeCustomConfig(require('../config.custom'))
var express = require('express')
var http = require('http')
var fs = require('fs')

// 下载文件路径
var downloadFiles = {
  min: {
    path: config.libNfsAbsolutePath + '/' + config.libDistTarName
  },
  source: {
    path: config.libNfsAbsolutePath + '/' + config.libSourceTarName
  }
}

// 判断运行环境
var isProduction = process.env.NODE_ENV === 'production'
var port = setting.port
var host = setting.host
if (isProduction) {
  port = process.env.PORT
  host = process.env.HOST
}

// app
var app = express()

// 创建日志目录
fs.existsSync(setting.logs.path.absolute) || fs.mkdirSync(setting.logs.path.absolute)

// 启用访问日志
require('./access.js')(app)

// 静态资源服务
app.use(config.distPublicPath, express.static(config.distProAbsolutePath))
app.set('views', config.templatesAbsolutePath)
app.engine('html', require('ejs').renderFile)

// Page Router
customConfig.entryArray.forEach(function (item) {
  app.get(item.router, function (req, res) {
    res.render(item.name + '.html')
  })
})

// Api download
app.get('/api/download/:type', function (req, res) {
  var type = req.params.type
  var item = downloadFiles[ type ]
  if (item) {
    console.log(item.path)
    if (fs.existsSync(item.path)) {
      res.download(item.path)
    } else {
      res.status(400).json({ message: 'File Not Found' })
    }
  } else {
    res.status(404).json({ message: 'URL Not Found' })
  }
})

// server
var server = http.createServer(app)
server.listen(port, host)
server.on('error', onError)
server.on('listening', onListening)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : addr.address + ':' + addr.port
  console.log('Listening on ' + bind)
}
