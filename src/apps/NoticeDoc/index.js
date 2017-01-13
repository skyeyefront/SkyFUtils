/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import {
  codes1, codes2, codes3,
  codes4, codes5, codes6,
  codes7, codes8, codes9
} from './codes'
import CodePanel from '../../components/CodePanel'
import {LabelBrowser, LabelCustom} from '../../components/Label'
import OptionsList from '../../components/OptionsList'

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
        type: 'Function',
        means: '点击事件回调'
      }, {
        name: 'onerror',
        type: 'Function',
        means: '错误事件回调'
      }, {
        name: 'onclose',
        type: 'Function',
        means: '关闭事件回调'
      }, {
        name: 'onshow',
        type: 'Function',
        means: '显示事件回调'
      } ],
      /* codes */
      codes1, codes2, codes3,
      codes4, codes5, codes6,
      codes7, codes8, codes9
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
    CodePanel,
    LabelBrowser,
    LabelCustom,
    OptionsList
  },
  ready () {
    this.notice
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
