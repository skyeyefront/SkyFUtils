/**
 * Created by huangxinxin on 16/9/2.
 */
import ENV from '../utils/env'

export const getVarName = function (name) {
  let prefix = ENV.prefix
  name = name.charAt(0).toUpperCase() + name.substring(1, name.length)
  return prefix + name
}
