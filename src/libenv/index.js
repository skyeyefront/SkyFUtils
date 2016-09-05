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

export default {
  install: function (envConfig, modulesConfig) {
    if (install(envConfig, modulesConfig)) {
      let components = {}
      if (ENV._isBrowser) {
        components[ getVarName('FileRead') ] = FileRead
        components[ getVarName('LocalStorage') ] = LocalStorage
        components[ getVarName('Notice') ] = Notice
      }
      if (ENV._isNode) {
        // todo node
      }
      components[ getVarName('Banner') ] = Banner
      components[ getVarName('Random') ] = Random
      components[ getVarName('StrBordered') ] = StrBordered
      logs.info('模块安装成功:', Object.keys(components))
      if (ENV.globalInstall) {
        for (let k in components) {
          if (components.hasOwnProperty(k)) {
            ENV._envVar[ k ] = components[ k ]
          }
        }
      } else {
        return components
      }
    }
  }
}
