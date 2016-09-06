/**
 * Created by huangxinxin on 16/8/24.
 */
import {url} from '../vuex/getters'
import store from '../vuex/index'

/**
 * @param  {[type]} uri [description]
 * @return {[type]}     [description]
 */
export const router = function (uri) {
  let URL = url(store.state)
  let path = [ URL.base, uri ]
  return path.join('/')
}

export default {
  install: function (Vue, {debug = false} = {}) {
    Vue.filter('router', router)
    if (debug) {
      console.info('[commons/filters.js]安装成功')
    }
  }
}
