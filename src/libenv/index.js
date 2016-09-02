/**
 * Created by huangxinxin on 16/8/23.
 */
import ENV from './utils/env'
import install from './utils/install'
import {getVarName} from './utils/commons'
import Notice from './browser/Notice'
import Banner from './usual/banner'
import StrBordered from './usual/strBordered'

export default {
  install: function (envConfig, modulesConfig) {
    if (install(envConfig, modulesConfig)) {
      let components = {}
      if (ENV._isBrowser) {
        components[ getVarName('Notice') ] = Notice
      }
      if (ENV._isNode) {
        // todo node
      }
      components[ getVarName('Banner') ] = Banner
      components[ getVarName('StrBordered') ] = StrBordered
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
