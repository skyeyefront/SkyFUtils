/**
 * Created by huangxinxin on 16/6/17.
 */
export function packageJson (state) {
  return state.packageJson
}

export function url (state) {
  return state.url
}

export function urlRouters (state) {
  return state.url.routers
}

export function urlActiveRouter (state) {
  return state.url.activeRouter
}

export function isHome (state) {
  return state.url.activeRouter && state.url.activeRouter.uri === 'home'
}

export function status (state) {
  return state.status
}

export function statusUrl (state) {
  return state.status.url
}

export function errors (state) {
  return state.errors
}
