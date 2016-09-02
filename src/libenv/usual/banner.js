/**
 * Created by huangxinxin on 16/9/2.
 */
export default function (notPrint) {
  var arr = [
    '******   *     *  *         *  ******  *         *  ******',
    '*        *   *      *     *    *         *     *    *',
    '*        * *          * *      *           * *      *',
    '******   *             *       ******       *       ******',
    '     *   * *           *       *            *       *',
    '     *   *   *         *       *            *       *',
    '******   *     *       *       ******       *       ******'
  ]
  let str = '\n' + arr.join('\n') + '\n'
  if (notPrint) {
    return str
  }
  console.log(str)
}
