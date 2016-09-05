/**
 * Created by huangxinxin on 16/9/2.
 */
import $ from 'jquery'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  props: {
    codeType: {
      type: String,
      default: 'javascript'
    },
    codeText: {
      type: Array,
      default: function () {
        // let example = [ 'var a = 123', 'a = a + 1' ]
        return []
      }
    }
  },
  computed: {
    codeTextStr: function () {
      return this.codeText.join('\n')
    }
  },
  ready () {
    $(this.$el).children('code').each(function (i, block) {
      hljs.highlightBlock(block)
    })
  },
  template: '<pre><code class="{{ codeType }}">{{ codeTextStr }}</code></pre>'
}
