/**
 * Created by huangxinxin on 16/8/24.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../components/Label'
import AppFooter from '../../components/AppFooter'
import {packageJson} from '../../vuex/getters'
import config from '../../commons/config'

export default {
  template,
  vuex: {
    getters: {
      packageJson
    }
  },
  data () {
    return {
      style,
      config,
      $getStartEl: null,
      codesInBrowser: [
        '// 全局安装',
        'SkyFUtils.install()',
        '// 本地安装',
        'var local = SkyFUtils.install({',
        '  globalInstall: false',
        '})'
      ],
      codesInNode: [
        '// 全局安装',
        'SkyFUtils.install({env: "node"})',
        '// 本地安装',
        'var local = SkyFUtils.install({',
        '  env: "node", globalInstall: false',
        '})'
      ],
      str: ''
    }
  },
  computed: {
    codesInRun () {
      return [
        '// strBordered',
        'window.SkyEyeStrBordered("Hi, SkyEye!")',
        '// 运行结果',
        this.str
      ]
    }
  },
  methods: {
    gotoGetStart () {
      if (this.$getStartEl) {
        let top = this.$getStartEl.offset().top
        this.$bodyScrollTop(top)
      }
    },
    runCode () {
      this.str = window.SkyEyeStrBordered('Hi, SkyEye!', true)
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, AppFooter
  },
  ready () {
    this.$getStartEl = window.$('#' + style.getStart)
    if (!this.$getStartEl.length) {
      this.$getStartEl = null
    }
  }
}
