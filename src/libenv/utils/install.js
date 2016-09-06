/**
 * Created by huangxinxin on 16/8/23.
 */
import ENV from './env'
import logs from './logs'

export default function ({env = 'browser', debug = false, prefix = 'SkyEye', globalInstall = true} = {}, modulesConfig = {}) {
  ENV.env = env
  ENV.debug = debug
  ENV.prefix = prefix
  ENV.globalInstall = globalInstall
  ENV.modulesConfig = modulesConfig
  if (ENV._envChoices.indexOf(ENV.env) === -1) {
    logs.error('环境依赖安装失败, 原因: `' + ENV.env + '`不在' + ENV._envChoices + '中')
    return false
  } else {
    if (ENV.env === 'browser') {
      ENV._isBrowser = true
      ENV._isNode = false
      ENV._envVar = window
    } else if (ENV.env === 'node') {
      ENV._isBrowser = false
      ENV._isNode = true
      ENV._envVar = global
    }
    logs.info('环境依赖安装成功', ENV)
    return true
  }
}
