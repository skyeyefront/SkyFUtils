/**
 * Created by j-huangwei-ty on 2016/9/13.
 */
import template from './template.html'
import style from './style.less'

export default {
  template,
  props: {
    changeList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      style,
      typeClassDict: {
        update: 'info',
        remove: 'danger',
        add: 'success',
        fix: 'warning'
      },
      typeStrDict: {
        update: '[^]',
        remove: '[-]',
        add: '[+]',
        fix: '[#]'
      }
    }
  },
  methods: {
    typeClass (item) {
      return this.typeClassDict[ item.type ] || 'default'
    },
    typeStr (item) {
      return this.typeStrDict[ item.type ] || ''
    }
  }
}
