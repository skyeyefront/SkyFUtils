/**
 * Created by huangxinxin on 16/5/18.
 */
import ENV from './env'

export default {
  log: function (...args) {
    if (ENV.debug) {
      console.log('[' + ENV.name + ']', ...args)
    }
  },
  info: function (...args) {
    if (ENV.debug) {
      console.info('[' + ENV.name + ']', ...args)
    }
  },
  warn: function (...args) {
    if (ENV.debug) {
      console.warn('[' + ENV.name + ']', ...args)
    }
  },
  error: function (...args) {
    if (ENV.debug) {
      console.error('[' + ENV.name + ']', ...args)
    }
  }
}
