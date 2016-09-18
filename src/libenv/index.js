/**
 * Created by huangxinxin on 16/8/23.
 */
import ENV from './utils/env'
import logs from './utils/logs'
import install from './utils/install'
import {getVarName} from './utils/commons'
import FileRead from './browser/FileRead'
import LocalStorage from './browser/localStorage'
import Notice from './browser/Notice'
import Banner from './usual/banner'
import Random from './usual/random'
import StrBordered from './usual/strBordered'
import RegExp from './usual/regExp'

export default {
  install: function (envConfig, modulesConfig) {
    if (install(envConfig, modulesConfig)) {
      let envVar = null
      let components = {}
      if (ENV._isBrowser) {
        components[ getVarName('FileRead') ] = FileRead
        components[ getVarName('LocalStorage') ] = LocalStorage
        components[ getVarName('Notice') ] = Notice
        try {
          envVar = window
        } catch (err) {
          logs.error(err)
          throw err
        }
      }
      if (ENV._isNode) {
        // todo node
        try {
          envVar = global
        } catch (err) {
          logs.error(err)
          throw err
        }
      }
      components[ getVarName('Banner') ] = Banner
      components[ getVarName('Random') ] = Random
      components[ getVarName('StrBordered') ] = StrBordered
      components[ getVarName('RegExp') ] = RegExp
      logs.info('模块安装成功:', Object.keys(components))
      if (ENV.globalInstall) {
        if (envVar) {
          for (let k in components) {
            if (components.hasOwnProperty(k)) {
              envVar[ k ] = components[ k ]
            }
          }
        }
      } else {
        return components
      }
    }
  }
}
