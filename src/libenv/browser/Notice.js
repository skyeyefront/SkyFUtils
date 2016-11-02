/**
 * Created by huangxinxin on 16/9/2.
 */
const requestPermission = Symbol('requestPermission')
const newNotification = Symbol('newNotification')

class Notice {
  constructor ({ noPermissionMessage = 'Sorry, 没有桌面通知的权限' } = {}) {
    this.permission = false
    this.noPermissionMessage = noPermissionMessage
    this.onclick = null
    this.onerror = null
    this.onclose = null
    this.onshow = null
    this[ requestPermission ]()
    this.setEvents()
    this.setOptions()
    return this
  }

  /**
   * @param onclick
   * @param onerror
   * @param onclose
   * @param onshow
   * @returns {Notice}
   */
  setEvents ({ onclick = null, onerror = null, onclose = null, onshow = null } = {}) {
    this.onclick = onclick
    this.onerror = onerror
    this.onclose = onclose
    this.onshow = onshow
    return this
  }

  /**
   * @param dir  文本方向, 默认auto, 可以是ltr或rtl
   * @param lang 提示的语言, 默认UTF-8
   * @param body 提示主体内容(字符串)
   * @param tag  当前通知的唯一标识(字符串)
   * @param icon 图标地址(字符串)
   * @param data 和通知相关联的数据(任意类型), 通过事件回调函数参数进行访问
   * @param renotify 新通知出现的时候是否替换之前的(布尔型), 默认false, 必须配合tag进行使用, 设置一致的tag才能进行替换
   * @returns {Notice}
   */
  setOptions ({
    dir = 'auto', lang = 'UTF-8',
    body = '', tag = '', icon = '', data = '', renotify = false
  } = {}) {
    this.options = {
      dir, lang, body, tag, icon, data, renotify
    }
    return this
  }

  /**
   * @param title
   * @param options
   * @param onclick
   * @param onerror
   * @param onclose
   * @param onshow
   * @returns {*}
   */
  show (title, options, { onclick = null, onerror = null, onclose = null, onshow = null } = {}) {
    options = Object.assign({}, this.options, options)
    if (Notification.permission === 'granted') {
      return this[ newNotification ](title, options, onclick, onerror, onclose, onshow)
    }
    return null
  }

  [requestPermission] () {
    Notification
      .requestPermission()
      .then(function (permission) {
        if (permission === 'granted') {
          this.permission = true
        } else {
          console.warn(this.noPermissionMessage)
          window.alert(this.noPermissionMessage)
        }
      }.bind(this))
    return this
  }

  [newNotification] (title, options, onclick, onerror, onclose, onshow) {
    let instance = new Notification(title, options)

    if (onclick instanceof Function) {
      instance.onclick = onclick
    } else if (this.onclick instanceof Function) {
      instance.onclick = this.onclick
    }

    if (onerror instanceof Function) {
      instance.onerror = onerror
    } else if (this.onerror instanceof Function) {
      instance.onerror = this.onerror
    }

    if (onclose instanceof Function) {
      instance.onclose = onclose
    } else if (this.onclose instanceof Function) {
      instance.onclose = this.onclose
    }

    if (onshow instanceof Function) {
      instance.onshow = onshow
    } else if (this.onshow instanceof Function) {
      instance.onshow = this.onshow
    }

    return instance
  }
}

export default Notice
