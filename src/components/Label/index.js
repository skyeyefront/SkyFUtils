/**
 * Created by huangxinxin on 16/9/2.
 */
export const LabelBrowser = {
  template: '<span class="label label-primary">Browser</span>'
}

export const LabelNode = {
  template: '<span class="label label-info">Node</span>'
}

export const LabelCustom = {
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  template: '<span class="label label-{{ type }}"><slot></slot></span>'
}
