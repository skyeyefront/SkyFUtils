/**
 * Created by huangxinxin on 16/8/24.
 */
import style from './style.less'
import template from './template.html'

export default {
  props: {
    list: {
      type: Array,
      default () {
        // let example = [ {
        //  target: 'domId',
        //  text: 'text'
        // } ]
        return []
      }
    },
    borderDir: {
      type: String,
      default: 'start' // start | end
    }
  },
  data () {
    return {
      style,
      active: null
    }
  },
  computed: {
    classObj () {
      let obj = {}
      obj[ style[ 'nav-pills' ] ] = true
      obj[ style[ 'nav-pills-left' ] ] = this.borderDir === 'start'
      return obj
    }
  },
  methods: {
    onClick (now) {
      this.active = now
    }
  },
  template
}
