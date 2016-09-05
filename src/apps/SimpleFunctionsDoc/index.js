/**
 * Created by huangxinxin on 16/8/29.
 */
import style from './style.less'
import template from './template.html'
import SlideNav from '../../components/SlideNav'
import {LabelBrowser, LabelNode, LabelCustom} from '../../components/Label'
import Banner from './Banner'
import Random from './Random'
import StrBordered from './StrBordered'

export default{
  template,
  data () {
    return {
      style,
      comps: [ {
        target: Banner.domId,
        text: 'Banner',
        component: 'Banner',
        labels: Banner.labels
      }, {
        target: Random.domId,
        text: 'Random',
        component: 'Random',
        labels: Random.labels
      }, {
        target: StrBordered.domId,
        text: 'StrBordered',
        component: 'StrBordered',
        labels: StrBordered.labels
      } ],
      checkedLabels: []
    }
  },
  computed: {
    labelsDict () {
      let dict = {}
      this.comps.forEach(function (item) {
        item.labels.forEach(function (l) {
          if (!dict.hasOwnProperty(l)) dict[ l ] = 0
          dict[ l ] += 1
        })
      })
      return dict
    }
  },
  components: {
    SlideNav,
    Banner,
    Random,
    StrBordered,
    LabelBrowser, LabelNode, LabelCustom
  },
  methods: {
    randomColor () {
      return window.SkyEyeRandom.rgba(1)
    },
    moduleShow (item) {
      return item.labels.some(function (l) {
        return this.checkedLabels.indexOf(l) !== -1
      }.bind(this))
    }
  },
  ready () {
    this.checkedLabels = Object.keys(this.labelsDict)
  }
}
