/**
 * Created by huangxinxin on 16/8/24.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../components/CodePanel'
import ChangeList from '../../components/ChangeList'
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
      str: '',
      changeList: [
        {
          version: 'v0.1.0',
          time: '2016-11-02',
          changeItems: [
            {
              content: '修改桌面通知函数在实例化时即申请权限（之前是在执行show方法时才申请）',
              type: 'update' // update | fix | add
            }
          ]
        },
        {
          version: 'v0.0.7',
          time: '2016-09-18',
          changeItems: [
            {
              content: '新增正则表达式匹配功能',
              type: 'add' // update | fix | add
            }, {
              content: '新增修改记录列表ChangeLog',
              type: 'add' // update | fix | add
            }
          ]
        },
        {
          version: 'v0.0.6',
          time: '2016-09-13',
          changeItems: [
            {
              content: '修复了lib install时env变量在node下的bug',
              type: 'fix' // update | fix | add
            }
          ]
        }, {
          version: 'v0.0.1 - v0.0.4',
          time: '2016-09-07',
          changeItems: [
            {
              content: 'Browser和Node通用方法：Banner像素字符生成器、随机颜色、随机数',
              type: 'add'
            }, {
              content: 'Browser浏览器方法：文件读取、本地存储、桌面通知功能',
              type: 'add'
            }
          ]
        }
      ]
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
    CodePanel, LabelBrowser, LabelNode, AppFooter, ChangeList
  },
  ready () {
    this.$getStartEl = window.$('#' + style.getStart)
    if (!this.$getStartEl.length) {
      this.$getStartEl = null
    }
    this.$getChangeLogEL = window.$('#' + style.changeLog)
    if (!this.$getChangeLogEL.length) {
      this.$getChangeLogEL = null
    }
  }
}
