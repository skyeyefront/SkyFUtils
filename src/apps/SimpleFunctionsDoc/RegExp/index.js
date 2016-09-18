/**
 * Created by j-huangwei-ty on 2016/9/13.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'

export default{
  domId: style.regexp,
  labels: [ 'browser', 'node', 'regExp' ],
  template,
  data () {
    return {
      style,
      general: {
        regExp: null,
        str: null,
        valResult: null
      },
      telResult: null,
      emailResult: null,
      idResult: null,
      ipv4Result: null,
      mobileResult: null,
      md5Result: null,
      urlResult: null,
      regExp: {
        tel: null,
        email: null,
        id: null,
        ipv4: null,
        mobile: null,
        md5: null,
        url: null
      },
      telOptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的tel',
        required: true
      } ],
      emailOptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的email',
        required: true
      } ],
      idOptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的身份证号',
        required: true
      } ],
      ipv4OptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的ip',
        required: true
      } ],
      mobileOptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的移动电话',
        required: true
      } ],
      md5OptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的MD5',
        required: true
      } ],
      urlOptionList: [ {
        name: 'v',
        type: 'String',
        default: 'Null',
        means: '待验证的URL',
        required: true
      } ],
      generalOptionList: [
        {
          name: 'regExp',
          type: 'String',
          default: 'Null',
          means: '自定义的正则表达式',
          required: true
        }, {
          name: 'str',
          type: 'String',
          default: 'Null',
          means: '检测字符串str是否能通过正则表达式regexp验证',
          required: true
        }
      ]
    }
  },
  computed: {
    telCodes () {
      if (!this.regExp.tel) return [ 'SkyEyeRegExp.isTel()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isTel(\'' + this.regExp.tel + '\')', '结果如下:', this.telResult ]
    },
    mobileCodes () {
      if (!this.regExp.mobile) return [ 'SkyEyeRegExp.isMobile()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isMobile(\'' + this.regExp.mobile + '\')', '结果如下:', this.mobileResult ]
    },
    idCodes () {
      if (!this.regExp.id) return [ 'SkyEyeRegExp.isId()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isId(\'' + this.regExp.id + '\')', '结果如下:', this.idResult ]
    },
    ipv4Codes () {
      if (!this.regExp.ipv4) return [ 'SkyEyeRegExp.isIpv4()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isIpv4(\'' + this.regExp.ipv4 + '\')', '结果如下:', this.ipv4Result ]
    },
    emailCodes () {
      if (!this.regExp.email) return [ 'SkyEyeRegExp.isEmail()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isEmail(\'' + this.regExp.email + '\')', '结果如下:', this.emailResult ]
    },
    urlCodes () {
      if (!this.regExp.url) return [ 'SkyEyeRegExp.isUrl()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isUrl(\'' + this.regExp.url + '\')', '结果如下:', this.urlResult ]
    },
    md5Codes () {
      if (!this.regExp.md5) return [ 'SkyEyeRegExp.isMd5()', '结果如下:' ]
      return [ 'SkyEyeRegExp.isMd5(\'' + this.regExp.md5 + '\')', '结果如下:', this.md5Result ]
    },
    generalCodes () {
      let exp = this.general.regExp
      let str = this.general.str
      return [ 'SkyEyeRegExp.testRegExp(' + (exp ? '\'' + exp + '\', ' : 'null, ') + (str ? '\'' + str + '\'' : 'null)'),
        '结果如下:', this.general.valResult ]
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  methods: {
    runTestTel () {
      this.telResult = window.SkyEyeRegExp.isTel(this.regExp.tel)
    },
    runTestEmail () {
      this.emailResult = window.SkyEyeRegExp.isEmail(this.regExp.email)
    },
    runTestId () {
      this.idResult = window.SkyEyeRegExp.isId(this.regExp.id)
    },
    runTestIpv4 () {
      this.ipv4Result = window.SkyEyeRegExp.isIpv4(this.regExp.ipv4)
    },
    runTestMobile () {
      this.mobileResult = window.SkyEyeRegExp.isMobile(this.regExp.mobile)
    },
    runTestMd5 () {
      this.md5Result = window.SkyEyeRegExp.isMd5(this.regExp.md5)
    },
    runTestUrl () {
      this.urlResult = window.SkyEyeRegExp.isUrl(this.regExp.url)
    },
    runGeneral () {
      this.general.valResult = window.SkyEyeRegExp.testRegExp(this.general.regExp, this.general.str)
    }
  },
  ready () {
  }
}
