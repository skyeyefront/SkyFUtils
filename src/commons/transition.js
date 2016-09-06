/* 动画效果请参见 https://github.com/daneden/animate.css */
import '../../plugins/animate.css'
import $ from 'jquery'

let _factory = function (enterClass, leaveClass) {
  let triggerCallback = function (eventName) {
    return function (el) {
      let vueObj = el.__vue__ || el.__v_trans && el.__v_trans.vm || null
      let namespace = $(el).attr('namespace')
      if (vueObj) {
        let callbackName = 'transition'
        if (namespace) {
          callbackName += namespace.charAt(0).toUpperCase() + namespace.substring(1, namespace.length)
        }
        callbackName += eventName.charAt(0).toUpperCase() + eventName.substring(1, eventName.length)
        vueObj[ callbackName ] instanceof Function && vueObj[ callbackName ]()
      }
    }
  }

  return {
    enterClass,
    leaveClass,
    beforeEnter: triggerCallback('beforeEnter'),
    enter: triggerCallback('enter'),
    afterEnter: triggerCallback('afterEnter'),
    enterCancelled: triggerCallback('enterCancelled'),
    beforeLeave: triggerCallback('beforeLeave'),
    leave: triggerCallback('leave'),
    afterLeave: triggerCallback('afterLeave'),
    leaveCancelled: triggerCallback('leaveCancelled')
  }
}

let configs = [ {
  name: 'bounce', types: [ [ '', '' ], [ 'U', 'Up' ], [ 'D', 'Down' ], [ 'L', 'Left' ], [ 'R', 'Right' ] ]
}, {
  name: 'fade', types: [ [ '', '' ], [ 'U', 'Up' ], [ 'D', 'Down' ], [ 'L', 'Left' ], [ 'R', 'Right' ] ]
}, {
  name: 'slide', types: [ [ 'U', 'Up' ], [ 'D', 'Down' ], [ 'L', 'Left' ], [ 'R', 'Right' ] ]
}, {
  name: 'zoom', types: [ [ '', '' ], [ 'U', 'Up' ], [ 'D', 'Down' ], [ 'L', 'Left' ], [ 'R', 'Right' ] ]
}, {
  name: 'filp', types: [ [ 'X', 'X' ], [ 'Y', 'Y' ] ]
}, {
  name: 'lightSpeed', types: [ [ '', '' ] ]
}, {
  name: 'roll', types: [ [ '', '' ] ]
}, {
  name: 'rotate',
  types: [ [ '', '' ], [ 'DL', 'DownLeft' ], [ 'DR', 'DownRight' ], [ 'UL', 'UpLeft' ], [ 'UR', 'UpRight' ] ]
} ]

export default {
  install: function (Vue, {debug = false} = {}) {
    let dict = {}
    configs.forEach((item) => {
      item.types.forEach((i) => {
        let [ik, iv] = i
        item.types.forEach((o) => {
          let [ok, ov] = o
          let name = item.name + ik + ok
          let inCss = item.name + 'In' + iv
          let outCss = item.name + 'Out' + ov
          dict[ name ] = [ inCss, outCss ].toString()
          Vue.transition(name, _factory(inCss, outCss))
        })
      })
    })
    if (debug) {
      console.info('[commons/transition.js]安装成功', dict)
    }
  }
}
