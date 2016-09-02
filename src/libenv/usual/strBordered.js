/**
 * Created by huangxinxin on 16/9/2.
 * 字符串加边框(不支持中文)
 */
export default function (str, notPrint) {
  str = '| ' + str.replace(/\n/g, ' ').replace(/\t/g, ' ') + ' |'
  var str1 = '\n' + ('-').repeat(str.length) + '\n'
  if (notPrint) {
    return str1 + str + str1
  }
  console.log(str1 + str + str1)
}
