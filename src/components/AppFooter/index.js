/**
 * Created by huangxinxin on 16/9/7.
 */
import style from './style.less'
import template from './template.html'
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
      config
    }
  }
}
