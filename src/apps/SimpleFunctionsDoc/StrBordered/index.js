/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'

export default{
  domId: style.strBordered,
  labels: [ 'browser', 'node' ],
  template,
  data () {
    return {
      style,
      str: 'hello world',
      retStr: ''
    }
  },
  computed: {
    codes () {
      return [ 'SkyEyeStrBordered(' + this.str + ')', '输出如下:', this.retStr ]
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode
  },
  methods: {
    runIt: function () {
      this.retStr = window.SkyEyeStrBordered(this.str, true)
    }
  },
  ready () {
    this.runIt()
  }
}
