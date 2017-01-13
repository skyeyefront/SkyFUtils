// 根据开发环境进行对应的操作
import libJson from '../libenv/package.json'
let debug = process.SkyEye.ENV === 'dev'

let config = {
  debug,
  name: 'SkyFUtils',
  minZipUrl: '/api/download/min',
  codeZipUrl: '/api/download/source',
  qNpmUrl: 'https://www.npmjs.com/package/skyfutils',
  qNpmName: libJson.name
}

export default config
