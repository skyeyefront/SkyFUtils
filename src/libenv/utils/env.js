/**
 * Created by huangxinxin on 16/8/23.
 */
import packageJson from '../package.json'

let config = {
  name: packageJson.name,
  debug: false,
  prefix: 'SkyEye',
  env: 'browser', // browser | node
  globalInstall: true,
  modulesConfig: {},
  _isBrowser: true,
  _isNode: false,
  _envVar: window,
  _envChoices: [ 'browser', 'node' ]
}

export default config
