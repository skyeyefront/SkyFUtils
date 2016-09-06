/**
 * Created by huangxinxin on 16/8/24.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../components/Label'
import {packageJson} from '../../vuex/getters'

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
      $installEl: null,
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
    gotoInstall () {
      if (this.$installEl) {
        let top = this.$installEl.offset().top
        this.$bodyScrollTop(top)
      }
    },
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
    CodePanel, LabelBrowser, LabelNode
  },
  ready () {
    this.$installEl = window.$('#' + style.install)
    this.$getStartEl = window.$('#' + style.getStart)
    if (!this.$installEl.length) {
      this.$installEl = null
    }
    if (!this.$getStartEl.length) {
      this.$getStartEl = null
    }
  }
}
