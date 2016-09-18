/**
 * Created by j-huangwei-ty on 2016/9/13.
 */
import template from './template.html'
import style from './style.less'

export default {
  template,
  data () {
    return {
      style
    }
  },
  props: {
    changeList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    runCode: function () {
    }
  }
}
