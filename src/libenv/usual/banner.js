/**
 * Created by huangxinxin on  6/9/2.
 */
import bannerDict from './bannerDict'

// 基元字母大小
const baseSize = 7

/**
 * 返回输入字符串对应的像素化字符
 * @param str 输入字符串
 * @param args {scale: 缩放倍数, wordSpace: 字符间距, notPrint: 是否不打印}
 * @returns {String}
 */
export default function (str, scale, wordSpace, notPrint) {
  if (str === '') str = 'skyeye'
  if (str === undefined || typeof str !== 'string') return 'error'

  str = str.toUpperCase()

  let _wordSpace = 4
  let _scaleTimes = 1
  let _notPrint = false
  if (scale && parseInt(scale)) _scaleTimes = parseInt(scale)
  if (wordSpace && parseInt(wordSpace)) _wordSpace = parseInt(wordSpace)
  if (notPrint !== undefined) _notPrint = notPrint

  let wordSpaceStr = ''
  for (let i = 0; i < _wordSpace; i++) {
    wordSpaceStr += ' '
  }

  let inputArr = str.split('')
  let result = []
  for (let i = 0; i < _scaleTimes * baseSize; i++) {
    result[ i ] = ''
  }
  inputArr.forEach(function (character) {
    let charArr = scaledLetter(bannerDict[ character ], _scaleTimes)
    for (let i = 0; i < charArr.length; i++) {
      result[ i ] += wordSpaceStr + charArr[ i ]
    }
  })

  if (_notPrint) {
    return getJointStr(result)
  }
  console.log(getJointStr(result))
  return getJointStr(result)
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

