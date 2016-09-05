/**
 * Created by huangxinxin on 16/9/5.
 */

// 随机颜色
function _rgba (a) {
  let r = _int(255)
  let g = _int(255)
  let b = _int(255)
  a = (a && !isNaN(+a)) ? a : Math.random()
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
}

// 随机整数
function _int (num) {
  num = (num && !isNaN(+num)) ? num : 100
  return parseInt(Math.random() * num)
}

function _id (prefix = '', pow = 32) {
  prefix = typeof prefix === 'string' ? prefix : ''
  pow = (pow && !isNaN(+pow)) ? pow : 32
  if (pow < 0) pow = 1
  if (pow > 32) pow = 32
  return prefix + (+new Date()) + '' + (Math.abs(~~(Math.random() * Math.pow(2, pow))))
}

export default {
  id: _id,
  int: _int,
  rgba: _rgba
}
