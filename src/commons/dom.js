/**
 * Created by huangxinxin on 16/9/6.
 */
export default {
  install: function (Vue, {$ = null, debug = false} = {}) {
    if ($) {
      Vue.prototype.$windowScrollTop = function (top) {
        $(window).scrollTop(top)
      }

      Vue.prototype.$bodyScrollTop = function (top) {
        top = +top
        if (!isNaN(top)) {
          top -= 80
          let duration = top
          if (duration < 300) {
            duration = 300
          }
          if (duration > 1000) {
            duration = 1000
          }
          $('body').animate({ scrollTop: top }, duration)
        }
      }

      Vue.prototype.$getWindowScrollTopValue = function () {
        return $(window).scrollTop()
      }

      Vue.prototype.$addWindowScrollEventListener = function (cb) {
        $(window).scroll(cb)
      }

      if (debug) {
        console.info('[commons/dom.js]安装成功')
      }
    } else {
      if (debug) {
        console.error('[commons/dom.js]安装失败, `$`未定义')
      }
    }
  }
}
