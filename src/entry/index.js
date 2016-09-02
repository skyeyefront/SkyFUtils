import 'bootstrap/dist/css/bootstrap.css'
import './index.less'
import Vue from 'vue'
import page from 'page'
import template from './index.html'
import store from '../vuex/index'
import {routerGo} from '../vuex/actions'
import {url, urlRouters, urlActiveRouter} from '../vuex/getters'
import filter from '../commons/filters'
import SkyFUtils from '../libenv/index'
import config from '../commons/config'
// 安装过滤器
Vue.use(filter)
// 本地安装
Vue.prototype.SkyFUtils = SkyFUtils.install({ debug: config.debug, globalInstall: false })
// 全局安装
SkyFUtils.install({ debug: config.debug })
// 动态组件
let components = {}
urlRouters(store.state).concat(url(store.state).router404).forEach(function (item) {
  components[ item.component.name ] = item.component.module
})

let App = {
  template,
  components,
  vuex: {
    actions: {
      routerGo
    },
    getters: {
      url,
      urlRouters,
      urlActiveRouter
    }
  },
  computed: {
    activeRouter: function () {
      return this.apps.active.uri
    }
  },
  created () {
    page.base(this.url.base)
    page('/', this.routerGo.bind(this))
    page('/:app/:any*', this.routerGo.bind(this))
  },
  ready () {
    page.start()
  }
}

let run = function () {
  return new Vue({
    el: 'body',
    replace: false,
    components: {
      App
    },
    store
  })
}

run()
