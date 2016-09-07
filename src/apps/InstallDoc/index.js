/**
 * Created by huangxinxin on 16/9/6.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../components/Label'
import OptionsList from '../../components/OptionsList'
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
      codesComplete: [
        'SkyFUtils.install({',
        '  env: "node"',
        '  debug: false',
        '  prefix: "SkyEye"',
        '  globalInstall: true',
        '})'
      ],
      envOptions: [ {
        name: 'env',
        type: 'String',
        default: 'browser',
        choice: [ 'browser', 'node' ],
        means: '当前安装的环境类型'
      }, {
        name: 'debug',
        type: 'Boolean',
        default: false,
        means: '是否是调试模式, 调试模式会有相应的<code>Console</code>输出'
      }, {
        name: 'prefix',
        type: 'String',
        default: 'SkyEye',
        means: '命名前缀字符串'
      }, {
        name: 'globalInstall',
        type: 'Boolean',
        default: true,
        means: '是否是全局安装, 全局安装会将属性挂载到全局变量上, browser => <code>window</code>, node => <code>global</code>'
      } ],
      modulesOptions: []
    }
  },
  components: {
    CodePanel, OptionsList, LabelBrowser, LabelNode
  }
}
