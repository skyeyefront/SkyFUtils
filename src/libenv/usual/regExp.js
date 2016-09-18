let regDict = {
  id: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
  email: /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,
  mobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
  tel: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
  ipv4: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  md5: /^[a-z0-9]{32}$/,
  url: /^((https|http):\/\/)?(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))|([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().?:@&=+$,%#-]+)+\/?){1}/,
  clearSymbol: /[ |~|`|!|@|#|\$|%|\^|&|\*|\(|\)|\-|_|\+|=|\||\\|\[|\]|\{|\}|\|:|"|'|,|<|\.|>|\/|\?]/g
}

let regValidator = {}

regValidator.isId = function (v) {
  return regDict.id.test(v)
}
regValidator.isEmail = function (v) {
  return regDict.email.test(v)
}
regValidator.isMobile = function (v) {
  return regDict.mobile.test(v)
}
regValidator.isTel = function (v) {
  return regDict.tel.test(v)
}
regValidator.isIpv4 = function (v) {
  return regDict.ipv4.test(v)
}
regValidator.isMd5 = function (v) {
  return regDict.md5.test(v)
}
regValidator.isUrl = function (v) {
  return regDict.url.test(v)
}
regValidator.isClearSymbol = function (v) {
  return regDict.clearSymbol.test(v)
}
regValidator.testRegExp = function (exp, str) {
  if (exp.substring(0, 1) === '/' && exp.substring(exp.length - 1, exp.length) === '/') {
    exp = exp.substring(1, exp.length - 1)
  }
  return new RegExp(exp).test(str)
}

export default regValidator
