// 根据开发环境进行对应的操作
import libJson from '../libenv/package.json'
let debug = process.SkyEye.ENV === 'dev'

let config = {
  debug,
  name: 'SkyFUtils',
  minZipUrl: '/api/download/min',
  codeZipUrl: '/api/download/source',
  qNpmUrl: 'http://10.16.66.42:5011/package/@qnpm/skyfutils',
  qNpmName: libJson.name
}

export default config
