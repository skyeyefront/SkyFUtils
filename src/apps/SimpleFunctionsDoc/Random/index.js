/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'

export default{
  domId: style.random,
  labels: [ 'browser', 'node', 'random' ],
  template,
  data () {
    return {
      style,
      rgbaValue: null,
      intValue: null,
      idValue: null,
      rgbaArgs: {
        a: null
      },
      intArgs: {
        num: null
      },
      idArgs: {
        prefix: null,
        pow: null
      },
      rgbaOptions: [ {
        name: 'a',
        type: 'Number',
        default: 'Math.random()',
        means: '透明度的值',
        min: 0,
        max: 1,
        required: false
      } ],
      intOptions: [ {
        name: 'num',
        type: 'Number',
        default: '100',
        means: '随机值的上限, 下限0',
        required: false
      } ],
      idOptions: [ {
        name: 'prefix',
        type: 'String',
        default: '空',
        means: '前缀字符串',
        required: false
      }, {
        name: 'pow',
        type: 'Number',
        default: '32',
        means: '2的指数次数的值',
        min: 0,
        max: 32,
        required: false
      } ]
    }
  },
  computed: {
    rgbaCodes () {
      return [ 'SkyEyeRandom.rgba(' + this.rgbaArgs.a + ')', '结果如下:', this.rgbaValue ]
    },
    intCodes () {
      return [ 'SkyEyeRandom.int(' + this.intArgs.num + ')', '结果如下:', this.intValue ]
    },
    idCodes () {
      return [ 'SkyEyeRandom.id(' + this.idArgs.prefix + ', ' + this.idArgs.pow + ')', '结果如下:', this.idValue ]
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  methods: {
    runRgba () {
      this.rgbaValue = window.SkyEyeRandom.rgba(this.rgbaArgs.a)
    },
    runInt () {
      this.intValue = window.SkyEyeRandom.int(this.intArgs.num)
    },
    runId () {
      this.idValue = window.SkyEyeRandom.id(this.idArgs.prefix, this.idArgs.pow)
    }
  },
  ready () {
    this.runRgba()
    this.runInt()
    this.runId()
  }
}
