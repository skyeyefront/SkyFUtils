/**
 * Created by huangxinxin on 16/8/24.
 */
import style from './style.less'
import template from './template.html'
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
      style
    }
  }
}
