/**
 * Created by huangxinxin on 16/8/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import * as types from './mutations'
import utils from './utils'
import config from '../commons/config'
import packageJson from '../libenv/package.json'

Vue.use(Vuex)

const state = {
  packageJson,
  // URL
  url: {
    base: '/page',
    path: '',
    app: '',
    subPath: '',
    queryString: '',
    routers: [ {
      uri: 'home',
      text: '首页',
      router: [ '', 'home' ],
      component: {
        name: 'PageHome',
        module: function (cb) {
          require([ 'COMPONENTS/PageHome/index' ], cb)
        }
      }
    }, {
      uri: 'start',
      text: '开始使用',
      router: [ 'start' ],
      component: {
        name: 'InstallDoc',
        module: function (cb) {
          require([ 'APPS/InstallDoc/index' ], cb)
        }
      }
    }, {
      uri: 'notice',
      text: '桌面通知',
      router: [ 'notice' ],
      component: {
        name: 'NoticeDoc',
        module: function (cb) {
          require([ 'APPS/NoticeDoc/index' ], cb)
        }
      }
    }, {
      uri: 'functions',
      text: '函数',
      router: [ 'functions' ],
      component: {
        name: 'SimpleFunctionsDoc',
        module: function (cb) {
          require([ 'APPS/SimpleFunctionsDoc/index' ], cb)
        }
      }
    } ],
    router404: {
      uri: '404',
      text: 'Not Found',
      component: {
        name: 'Page404',
        module: function (cb) {
          require([ 'COMPONENTS/Page404/index' ], cb)
        }
      }
    },
    activeRouter: null,
    ctx: {} // page.js 回调参数
  },
  // 状态
  status: {
    url: null
  },
  // 错误
  errors: {}
}

const mutations = {
  [types.URL_CHANGE] (state, ctx) {
    state.url.path = ctx.path
    let app = ctx.params.app || ''
    let subPath = ctx.params.any || ''
    state.url.app = app
    state.url.subPath = subPath
    state.url.queryString = ctx.querystring
    let item = state.url.routers.find(function (item) {
      let itemRouter = item.router
      if (itemRouter instanceof Array) {
        return itemRouter.some(function (u) {
          if (u instanceof RegExp) {
            return u.test(app)
          } else {
            return u === app
          }
        })
      } else if (itemRouter instanceof RegExp) {
        return itemRouter.test(app)
      } else {
        return itemRouter === app
      }
    })
    if (item) {
      state.url.activeRouter = item
    } else {
      state.url.activeRouter = state.url.router404
    }
    utils.setStatus(state, 'url', types.URL_CHANGE)
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  middlewares: [ config.debug && createLogger({
    collapsed: true, // 是否在console输出的时候收起
    transformer (state) {
      return state.subTree
    },
    mutationTransformer (mutation) {
      return { type: mutation.type, payload: mutation.payload }
    }
  }) ]
})
