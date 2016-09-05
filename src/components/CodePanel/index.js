/**
 * Created by huangxinxin on 16/9/5.
 */
import template from './template.html'
import HighlightCode from '../HighlightCode'

export default {
  template,
  props: {
    codeType: {
      type: String,
      default: 'javascript'
    },
    codeText: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: Boolean,
      default: false
    },
    runButton: {
      type: Boolean,
      default: false
    }
  },
  components: {
    HighlightCode
  },
  methods: {
    runCode: function () {
      this.$dispatch('run-code')
    }
  }
}
