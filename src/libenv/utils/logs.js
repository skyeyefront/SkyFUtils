/**
 * Created by huangxinxin on 16/5/18.
 */
import ENV from './env'

let prefix = function () {
  return '[' + ENV.name + ', global=' + ENV.globalInstall + ']'
}

export default {
  log: function (...args) {
    if (ENV.debug) {
      console.log(prefix(), ...args)
    }
  },
  info: function (...args) {
    if (ENV.debug) {
      console.info(prefix(), ...args)
    }
  },
  warn: function (...args) {
    if (ENV.debug) {
      console.warn(prefix(), ...args)
    }
  },
  error: function (...args) {
    if (ENV.debug) {
      console.error(prefix(), ...args)
    }
  }
}
