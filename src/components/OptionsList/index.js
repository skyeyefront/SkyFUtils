/**
 * Created by huangxinxin on 16/9/5.
 */
import template from './template.html'
import {LabelCustom} from '../Label'

export default {
  template,
  props: {
    list: {
      type: Array,
      default: function () {
        // let example = [ {
        //  name: 'dir', // 名称
        //  type: 'String', // 数据类型
        //  default: 'auto', // 默认值
        //  choice: [ 'ltr', 'rtr' ], // 值选项
        //  means: '文本方向', // 描述
        //  required: true // 是否必须,
        //  min: '', // 最小值
        //  max: '' // 最大值
        // } ]
        return []
      }
    }
  },
  components: {
    LabelCustom
  }
}
