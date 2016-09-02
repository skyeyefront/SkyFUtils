/**
 * Created by huangxinxin on 16/6/16.
 */
import * as types from './mutations'

/**
 * routerGo
 * @param store
 * @param uri
 * @param queryString
 */
export function routerGo (store, ctx) {
  store.dispatch(types.URL_CHANGE, ctx)
}
