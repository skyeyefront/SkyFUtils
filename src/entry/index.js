import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import page from 'page'
import style from './index.less'
import template from './index.html'
import store from '../vuex/index'
import {routerGo} from '../vuex/actions'
import {url, urlRouters, urlActiveRouter, isHome} from '../vuex/getters'
import filter from '../commons/filters'
import transition from '../commons/transition'
import SkyFUtils from '../libenv/index'
import config from '../commons/config'
// 安装过滤器
Vue.use(filter)
// 安装动画
Vue.use(transition)
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
      urlActiveRouter,
      isHome
    }
  },
  data () {
    return {
      style,
      domReady: false,
      scrollTop: 0
    }
  },
  computed: {
    activeRouter () {
      return this.apps.active.uri
    },
    overBottom () {
      return this.scrollTop > 36
    }
  },
  methods: {
    backTop () {
      window.$('body').animate({ 'scrollTop': 0 }, 300)
    }
  },
  created () {
    page.base(this.url.base)
    page('/', this.routerGo.bind(this))
    page('/:app/:any*', this.routerGo.bind(this))
  },
  ready () {
    page.start()
    window.$(window).scroll(function () {
      this.scrollTop = window.$(window).scrollTop()
    }.bind(this))
    this.domReady = true
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
