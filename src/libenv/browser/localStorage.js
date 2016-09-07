/**
 * Created by huangxinxin on 16/9/5.
 */
export default {
  set: function (key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (err) {
      throw err
    }
  },
  get: function (key) {
    let str = window.localStorage.getItem(key)
    return JSON.parse(str)
  },
  remove: function (key) {
    delete window.localStorage[ key ]
  },
  clear: function () {
    for (let key in window.localStorage) {
      delete window.localStorage[ key ]
    }
  },
  getAll () {
    return window.localStorage
  }
}
