// 根据开发环境进行对应的操作
let debug = process.SkyEye.ENV === 'dev'
let config = {}

config.debug = debug

export default config
