import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import page from 'page'
import style from './index.less'
import template from './index.html'
import store from '../vuex/index'
import {routerGo} from '../vuex/actions'
import {url, urlRouters, urlActiveRouter, isHome} from '../vuex/getters'
import filter from '../commons/filters'
import dom from '../commons/dom'
import transition from '../commons/transition'
import SkyFUtils from '../libenv/index'
import config from '../commons/config'
import AppFooter from '../components/AppFooter'
// 安装过滤器
Vue.use(filter, { debug: config.debug })
// 安装dom操作函数
Vue.use(dom, { debug: config.debug, $: window.$ })
// 安装动画
Vue.use(transition, { debug: config.debug })
// 全局安装
SkyFUtils.install({ debug: config.debug })
// 动态组件
let components = {
  AppFooter
}
urlRouters(store.state).concat(url(store.state).router404).forEach(function (item) {
  components[ item.component.name ] = item.component.module
})
// App
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
      config,
      domReady: false,
      scrollTop: 0,
      afterEnter: false
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
      this.$bodyScrollTop(this.scrollTop = 0)
    },
    transitionAppMainBeforeEnter () {
      this.afterEnter = false
      this.$windowScrollTop(this.scrollTop = 0)
    },
    transitionAppMainAfterEnter () {
      this.afterEnter = true
    }
  },
  created () {
    page.base(this.url.base)
    page('/', this.routerGo.bind(this))
    page('/:app/:any*', this.routerGo.bind(this))
  },
  ready () {
    page.start()
    this.$addWindowScrollEventListener(function () {
      this.scrollTop = this.$getWindowScrollTopValue()
    }.bind(this))
    this.domReady = true
  }
}
// run
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
