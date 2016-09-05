/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'

export default{
  domId: style.banner,
  labels: [ 'browser', 'node' ],
  template,
  data () {
    return {
      style,
      str: window.SkyEyeBanner(true)
    }
  },
  methods: {
    runIt () {
      window.SkyEyeBanner()
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode
  },
  ready () {
    window.SkyEyeBanner()
  }
}
