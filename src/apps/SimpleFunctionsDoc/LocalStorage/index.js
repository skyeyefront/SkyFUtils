/**
 * Created by j-huangwei-ty on 2016/9/6.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'

export default{
  domId: style.localStorage,
  labels: [ 'browser' ],
  template,
  data () {
    return {
      style,
      setMethodParams: {
        key: '',
        value: ''
      },
      setMethodOptions: [ {
        name: 'key',
        type: 'String',
        default: 'null',
        means: '为本地缓存中的key赋值',
        required: true
      }, {
        name: 'value',
        type: '任意类型',
        default: 'null',
        means: '设置本地缓存中的key值为value',
        required: true
      } ],
      getMethodParams: {
        key: ''
      },
      getMethodOptions: [ {
        name: 'key',
        type: 'String',
        default: 'null',
        means: '获得本地存储中key对应存储值',
        required: true
      } ],
      getMethodStr: '',
      removeMethodParams: {
        key: ''
      },
      removeMethodOptions: [ {
        name: 'key',
        type: 'String',
        default: 'null',
        means: '移除本地存储中key-value键值对',
        required: true
      } ],
      localStorageStr: ''
    }
  },
  computed: {
    setCodes () {
      if (this.setMethodParams.key !== '') {
        return [ 'SkyEyeLocalStorage.set(\'' + this.setMethodParams.key + '\',\'' + this.setMethodParams.value + '\')',
          '结果如下:', '当前本地存储为:{', this.localStorageStr + '}' ]
      }
      return [ 'SkyEyeLocalStorage.set()', '结果如下:', '当前本地存储为:{', this.localStorageStr + '}' ]
    },
    getCodes () {
      if (this.getMethodParams.key === '') {
        return [ 'SkyEyeLocalStorage.get()', '结果如下:', this.getMethodStr ]
      }
      return [ 'SkyEyeLocalStorage.get(\'' + this.getMethodParams.key + '\')', '结果如下:', this.getMethodStr ]
    },
    removeCodes () {
      return [ 'SkyEyeLocalStorage.remove(' + this.removeMethodParams.key + ')',
        '结果如下:', '当前本地存储为:{', this.localStorageStr + '}' ]
    },
    clearCodes () {
      return [ 'SkyEyeLocalStorage.clear()', '结果如下:', '当前本地存储为:{', this.localStorageStr + '}' ]
    }
  },
  methods: {
    runSet () {
      let self = this
      window.SkyEyeLocalStorage.set(self.setMethodParams.key, self.setMethodParams.value)
      this.getStorage()
    },
    runGet () {
      let tmp = window.SkyEyeLocalStorage.get(this.getMethodParams.key)
      if (tmp) {
        this.getMethodStr = this.getMethodParams.key + ': ' + tmp
      } else {
        this.getMethodStr = this.getMethodParams.key + ': ' + 'undefined'
      }
    },
    runRemove () {
      window.SkyEyeLocalStorage.remove(this.removeMethodParams.key)
      this.getStorage()
    },
    runClear () {
      window.SkyEyeLocalStorage.clear()
      this.getStorage()
    },
    getStorage () {
      let map = window.SkyEyeLocalStorage.getLocalStorage()
      let localStorage = ''
      for (let key in map) {
        localStorage += key + '--' + map[ key ] + '\n'
      }
      this.localStorageStr = localStorage
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  ready () {
    this.getStorage()
  }
}
