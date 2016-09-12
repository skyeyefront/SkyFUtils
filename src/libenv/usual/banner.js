/**
 * Created by huangxinxin on  6/9/2.
 */
import bannerDict from './bannerDict'

// 基元字母大小
const baseSize = 7

/**
 * 返回输入字符串对应的像素化字符
 * @param str 输入字符串
 * @param scale 缩放倍数
 * @param wordSpace 字符间距
 * @param notPrint  是否不打印
 * @returns String
 */
export default function (str, {scale = 1, wordSpace = 4, notPrint = false} = {}) {
  if ([ 'string', 'number' ].indexOf(typeof str) === -1) {
    throw new Error('第一个参数`str`类型错误, 类型必须是string或number')
  }
  str = str || 'skyeye'
  str = str.toUpperCase()
  scale = +scale
  wordSpace = +wordSpace
  scale = isNaN(scale) ? 1 : scale || 1
  wordSpace = isNaN(wordSpace) ? 4 : wordSpace
  if (scale > 3) {
    scale = 3
  } else if (scale < 1) {
    scale = 1
  }
  if (wordSpace > 8) {
    wordSpace = 8
  } else if (wordSpace < 0) {
    wordSpace = 0
  }
  let wordSpaceStr = (' ').repeat(wordSpace)
  let inputArr = str.split('')
  let result = []
  for (let i = 0; i < scale * baseSize; i++) {
    result[ i ] = ''
  }
  inputArr.forEach(function (character) {
    if (bannerDict[ character ]) {
      let charArr = scaledLetter(bannerDict[ character ], scale)
      for (let i = 0; i < charArr.length; i++) {
        result[ i ] += wordSpaceStr + charArr[ i ]
      }
    }
  })
  str = getJointStr(result)
  if (notPrint) {
    return str
  }
  console.log(str)
}

/**
 * 得到字母缩放scaleTimes倍数后的字母
 * @param letterArr
 * @param scaleTimes
 * @returns {Array}
 */
function scaledLetter (letterArr, scaleTimes) {
  let scaleSize = baseSize * scaleTimes
  let twoDimArrBefore = []
  letterArr.forEach(function (row) {
    twoDimArrBefore.push(row.split(''))
  })
  let twoDimArrAfter = []
  for (let i = 0; i < scaleSize; i++) {
    twoDimArrAfter[ i ] = []
    for (let j = 0; j < scaleSize; j++) {
      twoDimArrAfter[ i ][ j ] = ' '
    }
  }
  let result = []
  for (let i = 0; i < baseSize; i++) {
    for (let j = 0; j < baseSize; j++) {
      twoDimArrAfter[ i * scaleTimes ][ j * scaleTimes ] = twoDimArrBefore[ i ][ j ]
    }
    result.push(twoDimArrAfter[ i * scaleTimes ].join(''))
    for (let k = 1; k < scaleTimes; k++) {
      result.push(twoDimArrAfter[ i * scaleTimes + scaleTimes - k ].join(''))
    }
  }
  return result
}

/**
 * 得到一位数组的拼接字符串
 * @param arr
 * @returns {string}
 */
function getJointStr (arr) {
  return '\n' + arr.join('\n') + '\n'
}

