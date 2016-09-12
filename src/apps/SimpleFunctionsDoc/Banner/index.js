/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'

export default{
  domId: style.banner,
  labels: [ 'browser', 'node' ],
  template,
  data () {
    return {
      style,
      str: '',
      params: {
        inputStr: '',
        scale: 1,
        wordSpace: 1
      },
      paramsOptions: [
        {
          name: 'str',
          type: 'String',
          default: 'skyeye',
          means: '待像素化的字符串',
          required: false
        },
        {
          name: 'scale',
          type: 'Number',
          default: '1',
          means: '缩放倍数',
          required: false
        },
        {
          name: 'wordSpace',
          type: 'Number',
          default: '4',
          means: '字符间距',
          required: false
        }
      ]
    }
  },
  computed: {
    functionCodes: function () {
      let str = 'SkyEyeBanner('
      if (this.params.inputStr !== '') str += this.params.inputStr
      if (this.params.scale !== '') str += ',' + this.params.scale
      if (this.params.wordSpace !== '') str += ',' + this.params.wordSpace
      str += ')'
      return [ str, '结果如下:', this.str ]
    }
  },
  methods: {
    runIt () {
      this.str = window.SkyEyeBanner(this.params.inputStr, {
        scale: this.params.scale,
        wordSpace: this.params.wordSpace,
        notPrint: true
      })
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  ready () {
    this.runIt()
  }
}
