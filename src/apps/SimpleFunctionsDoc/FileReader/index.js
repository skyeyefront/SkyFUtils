/**
 * Created by j-huangwei-ty on 2016/9/6.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'
const textMaxLength = 1000
export default{
  domId: style.fileRead,
  labels: [ 'browser' ],
  template,
  data () {
    return {
      style,
      str: '',
      readImgResult: '',
      readTextResult: '',
      readImageURL: '',
      fileTypeOptions: [ 'readAsArrayBuffer', 'readAsBinaryString', 'readAsDataURL', 'readAsText' ],
      params: {
        file: [],
        textFile: [],
        imgFile: [],
        fileType: 'readAsText'
      },
      paramsOptions: [{
        name: 'file',
        type: 'File',
        default: 'null',
        means: '文件',
        required: true
      }, {
        name: 'fileType',
        type: 'String',
        default: 'readAsText',
        means: '文件类型',
        required: false
      }]
    }
  },
  computed: {
    functionCodes: function () {
      let str = ''
      if (this.params.file.length > 0) {
        str = 'new SkyEyeFileRead(\'' + this.params.file[0].name + '\'' + ').readAs(\'' + this.params.fileType + '\').read()'
      } else {
        str = 'new SkyEyeFileRead().readAs().read()'
      }
      if (this.params.fileType === 'readAsDataURL') {
        return [str, '结果如下:']
      } else {
        return [str, '结果如下:', this.str]
      }
    },
    imageURL: function () {
      if (this.params.fileType === 'readAsDataURL') {
        return this.str
      }
    },
    readTextCodes () {
      let str = 'new SkyEyeFileRead(' + (this.params.textFile.length > 0 ? '\'' + this.params.textFile[0].name + '\'' : '') + ')' +
        '.readAs(\'readAsText\').read()'
      return [str, '结果如下:', this.readTextResult]
    },
    readImgCodes () {
      let str = 'new SkyEyeFileRead(' + (this.params.imgFile.length > 0 ? '\'' + this.params.imgFile[0].name + '\'' : '') + ')' +
        '.readAs(\'readAsDataURL\').read()'
      return [str, '结果如下:']
    }
  },
  methods: {
    runIt () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.file)
      fileReader
        .readAs(self.params.fileType)
        .onReadEnd(function (e, file, result) {
          if (result.length > textMaxLength) {
            self.str = result.substring(0, textMaxLength) + '...'
          } else {
            self.str = result
          }
        })
        .read()
    },
    runReadText () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.textFile)
      fileReader
        .readAs('readAsText')
        .onReadEnd(function (e, file, result) {
          if (result.length > textMaxLength) {
            self.readTextResult = result.substring(0, textMaxLength) + '...'
          } else {
            self.readTextResult = result
          }
        })
        .read()
    },
    runReadImg () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.imgFile)
      fileReader
        .readAs('readAsDataURL')
        .onReadEnd(function (e, file, result) {
          self.readImageURL = result
        })
        .read()
    },
    getFileName (e) {
      this.params.file = e.target.files
    },
    getTextFileName (e) {
      this.params.textFile = e.target.files
    },
    getImgFileName (e) {
      this.params.imgFile = e.target.files
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  ready () {}
}
