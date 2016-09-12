/**
 * Created by huangxinxin on 16/8/29.
 */

var path = require('path')

module.exports = {
  host: '0.0.0.0',
  port: 3000,
  logs: {
    path: {
      absolute: path.resolve(__dirname, './logs')
    },
    access: {
      path: {
        absolute: path.resolve(__dirname, './logs/access')
      }
    }
  }
}
