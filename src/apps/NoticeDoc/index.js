/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import HighlightCode from '../../components/HighlightCode'
import {LabelBrowser, LabelCustom} from '../../components/Label'

export default{
  template,
  data () {
    return {
      style,
      notice: new window.SkyEyeNotice(),
      noticeTestCounts: 0,
      noticeShowInsArr: [],
      optionsList: [ {
        name: 'dir',
        type: 'String',
        default: 'auto',
        choice: [ 'ltr', 'rtr' ],
        means: '文本方向'
      }, {
        name: 'lang',
        type: 'String',
        default: 'UTF-8',
        means: '编码方式'
      }, {
        name: 'body',
        type: 'String',
        means: '消息正文文本'
      }, {
        name: 'tag',
        type: 'String',
        means: '当前通知的唯一标识, 如果设置, <code>renotify</code>必须设置为<code>true</code>一起使用'
      }, {
        name: 'icon',
        type: 'String',
        means: '图标地址, 可以是完整的图片<code>url(http://xxx/**.png)</code>, 也可以是<code>uri(/path/to/**.png)</code>'
      }, {
        name: 'data',
        type: 'Any',
        means: '当前通知的附加数据, 可以是任何类型, 通过事件回调参数进行访问或者执行<code>show</code>方法后返回的实例进行访问'
      }, {
        name: 'renotify',
        type: 'Boolean',
        default: false,
        choice: [ true, false ],
        means: '新通知出现的时候是否替换之前的, 设置为<code>true</code>时, 必须设置<code>tag</code>, 设置相同<code>tag</code>的会被替换'
      } ],
      eventsList: [ {
        name: 'onclick',
        means: '点击事件回调'
      }, {
        name: 'onerror',
        means: '错误事件回调'
      }, {
        name: 'onclose',
        means: '关闭事件回调'
      }, {
        name: 'onshow',
        means: '显示事件回调'
      } ],
      /* codes */
      // 全局安装
      codes1: [
        'var notice = new window.SkyEyeNotice()'
      ],
      // 本地安装
      codes2: [
        '// lib 为本地安装时的变量',
        'var lib = SkyFUtils.install({globalInstall: false })',
        'var notice = new lib.SkyEyeNotice()'
      ],
      codes3: [
        'notice.setOptions({...})'
      ],
      codes4: [
        'notice.setEvents({...})'
      ],
      codes5: [
        'notice.show("这里写Title", {body: "Hi, 这里写消息主体文本"})'
      ],
      codes6: [
        'notice.setOptions({',
        '  dir: "auto"',
        '  lang: "UTF-8"',
        '  body: "这里是正文 2"',
        '  tag: "tag-1"',
        '  icon: "http://10.16.66.42:5011/favicon.png"',
        '  data: {name: "skyeye"}',
        '  renotify: true',
        '})',
        'notice.show("这里写Title 2")'
      ],
      codes7: [
        'notice.show("这里写Title 3", {',
        '  dir: "auto"',
        '  lang: "UTF-8"',
        '  body: "这里是正文 3"',
        '  tag: "tag-2"',
        '  icon: "/assets/images/favicon.png"',
        '  data: {name: "hi, skyeye"}',
        '  renotify: true',
        '})'
      ],
      codes8: [
        'notice',
        '  .setEvents({',
        '    onclick: function (...args) {',
        '      console.log("Notice onClick", ...args)',
        '    },',
        '    onclose: function (...args) {',
        '       console.log("Notice onClose", ...args)',
        '    },',
        '    onerror: function (...args) {',
        '       console.log("Notice onError", ...args)',
        '    },',
        '    onshow: function (...args) {',
        '       console.log("Notice onShow", ...args)',
        '    }',
        '  })',
        '  .show("这里写Title 4", {body: "这里是正文 4"})'
      ],
      codes9: [
        'notice',
        '  .show("这里写Title 5", {body: "这里是正文 5"}, {',
        '    onclick: function (...args) {',
        '      console.log("Notice onClick", ...args)',
        '    },',
        '    onclose: function (...args) {',
        '       console.log("Notice onClose", ...args)',
        '    },',
        '    onerror: function (...args) {',
        '       console.log("Notice onError", ...args)',
        '    },',
        '    onshow: function (...args) {',
        '       console.log("Notice onShow", ...args)',
        '    }',
        '  })'
      ]
    }
  },
  methods: {
    noticeTest () {
      this.noticeTestCounts += 1
      this.pushNotice(this.notice.show('Hi', {
        body: '这是你第' + this.noticeTestCounts + '次点击...'
      }))
    },
    noticeRun1 () {
      this.pushNotice(this.notice.show('这里写Title', { body: 'Hi, 这里写消息主体文本' }))
    },
    noticeRun2 () {
      this.notice.setOptions({
        dir: 'auto',
        lang: 'UTF-8',
        body: '这里是正文 2',
        tag: 'tag-1',
        icon: 'http://10.16.66.42:5011/favicon.png',
        data: { name: 'skyeye' },
        renotify: true
      })
      this.pushNotice(this.notice.show('这里写Title 2'))
    },
    noticeRun3 () {
      this.pushNotice(this.notice.show('这里写Title 3', {
        dir: 'auto',
        lang: 'UTF-8',
        body: '这里是正文 3',
        tag: 'tag-2',
        icon: '/assets/images/favicon.png',
        data: { name: 'hi, skyeye' },
        renotify: true
      }))
    },
    noticeRun4 () {
      this.pushNotice(this.notice.show('这里写Title 4', {
        body: '这里是正文 4'
      }))
    },
    noticeRun5 () {
      this.pushNotice(this.notice.show('这里写Title 5', {
        body: '这里是正文 5'
      }, {
        onclick: function (...args) {
          console.log('Notice Once onClick', ...args)
        },
        onclose: function (...args) {
          console.log('Notice Once onClose', ...args)
        },
        onerror: function (...args) {
          console.log('Notice Once onError', ...args)
        },
        onshow: function (...args) {
          console.log('Notice Once onShow', ...args)
        }
      }))
    },
    pushNotice (insNow) {
      if (this.noticeShowInsArr.length >= 3) {
        this.noticeShowInsArr.forEach(function (item) {
          item.close()
        })
        this.noticeShowInsArr = []
      }
      console.log('New Notice', insNow)
      this.noticeShowInsArr.push(insNow)
    }
  },
  components: {
    HighlightCode,
    LabelBrowser,
    LabelCustom
  },
  ready () {
    this.notice
      .setOptions({
        icon: '/assets/images/favicon.png'
      })
      .setEvents({
        onclick: function (...args) {
          console.log('Notice onClick', ...args)
        },
        onclose: function (...args) {
          console.log('Notice onClose', ...args)
        },
        onerror: function (...args) {
          console.log('Notice onError', ...args)
        },
        onshow: function (...args) {
          console.log('Notice onShow', ...args)
        }
      })
  }
}
