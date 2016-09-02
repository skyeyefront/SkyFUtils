/**
 * Created by huangxinxin on 16/6/17.
 */
export function url (state) {
  return state.url
}

export function urlRouters (state) {
  return state.url.routers
}

export function urlActiveRouter (state) {
  return state.url.activeRouter
}

export function status (state) {
  return state.status
}

export function errors (state) {
  return state.errors
}
