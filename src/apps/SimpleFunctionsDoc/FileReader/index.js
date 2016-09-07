/**
 * Created by j-huangwei-ty on 2016/9/6.
 */
import style from './style.less'
import template from './template.html'
import CodePanel from '../../../components/CodePanel'
import {LabelBrowser, LabelNode} from '../../../components/Label'
import OptionsList from '../../../components/OptionsList'
const textMaxLength = 500
export default{
  domId: style.fileRead,
  labels: [ 'browser', 'file' ],
  template,
  data () {
    return {
      style,
      str: '',
      readImgResult: '',
      readTextResult: '',
      readImageURL: '',
      readAllImgURL: '',
      filterImageURL: '',
      readImageTips: {
        text: 'ERROR: 您选择的文件不是图片类型,请选择图片文件!',
        show: false
      },
      filterFun: '',
      fileTypeOptions: [ 'readAsArrayBuffer', 'readAsBinaryString', 'readAsDataURL', 'readAsText' ],
      params: {
        file: [],
        textFile: [],
        imgFile: [],
        fileType: 'readAsText',
        filterFile: '',
        eventFile: '',
        eventFileType: 'readAsText'
      },
      paramsOptions: [ {
        name: 'file',
        type: 'File',
        default: 'null',
        means: '文件',
        required: true
      }, {
        name: 'fileType',
        type: '[ readAsArrayBuffer | readAsBinaryString | readAsDataURL | readAsText ]',
        default: 'readAsText',
        means: '以不同格式读取文件<br>' +
        'readAsArrayBuffer: 读取文件为数组缓存格式<br>' +
        'readAsBinaryString: 以二进制防止读取文件内容<br>' +
        'readAsDataURL: 以图片方式读取文件内容<br>' +
        'readAsText: 以文本格式读取文件内容<br>',
        required: false
      } ],
      filterApiCodes: [ 'new SkyEyeFileRead(\'文件\')',
        '.readAs(\'文件类型\')',
        '.filter(function (f) {',
        '  console.log(f)',
        '  // 这里是filter方法，如过滤掉不是.txt的文件',
        '  return f.name.split(\'.\').pop() === \'txt\'',
        '})',
        '.read()' ]
    }
  },
  computed: {
    functionCodes: function () {
      let str = ''
      if (this.params.file.length > 0) {
        str = 'new SkyEyeFileRead(\'' + this.params.file[ 0 ].name + '\'' + ').readAs(\'' + this.params.fileType + '\').read()'
      } else {
        str = 'new SkyEyeFileRead().readAs().read()'
      }
      if (this.params.fileType === 'readAsDataURL') {
        return [ str, '结果如下:' ]
      } else {
        return [ str, '结果如下:', this.str ]
      }
    },
    readTextCodes () {
      let str = 'new SkyEyeFileRead(' + (this.params.textFile.length > 0 ? '\'' + this.params.textFile[ 0 ].name + '\'' : '') + ')' +
        '.readAs(\'readAsText\').read()'
      return [ str, '结果如下:', this.readTextResult ]
    },
    readImgCodes () {
      let tmp = [ 'new SkyEyeFileRead(' + (this.params.imgFile.length > 0 ? '\'' + this.params.imgFile[ 0 ].name + '\'' : '') + ')' +
      '.readAs(\'readAsDataURL\').read()', '结果如下:' ]
      if (this.readImageTips.show) tmp.push(this.readImageTips.text)
      return tmp
    },
    filterCodes () {
      return [ 'new SkyEyeFileRead(' + (this.params.filterFile.length > 0 ? '\'' + this.params.filterFile[ 0 ].name + '\'' : '') + ')',
        '.readAs(\'readAsDataURL\')',
        '.filter(function (f) {',
        '  console.log(f)',
        '  // 只通过图片格式文件',
        '  return f.type.indexOf(\'image/\') !== -1',
        '})',
        '.read()', '结果如下:' ]
    },
    readEventCodes () {
      return [ 'new SkyEyeFileRead(' + (this.params.eventFile.length > 0 ? '\'' + this.params.eventFile[ 0 ].name + '\'' : '') + ')',
        '.readAs(\'' + this.params.eventFileType + '\')',
        '.onReadStart(function (e, file) {',
        '  console.log(\'============Read Start=================\')',
        '  // 读取开始回调参数e为事件',
        '  console.log(\'事件e\', e)',
        '  // 读取开始回调参数file为待读取文件',
        '  console.log(\'待读取文件\', file)',
        '})',
        '.onReadEnd(function (e, file, result) {',
        '  console.log(\'============Read End=================\')',
        '  // 读取结束回调参数e为事件',
        '  console.log(\'事件e\', e)',
        '  // 读取结束回调参数file为已读取的文件',
        '  console.log(\'已读取文件file\', file)',
        '  // 读取结束回调参数result为文件内容',
        '  console.log(\'文件内容result\', result)',
        '})',
        '.read()'
      ]
    }
  },
  methods: {
    runIt () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.file)
      fileReader
        .readAs(self.params.fileType)
        .onReadEnd(function (e, file, result) {
          if (self.params.fileType === 'readAsDataURL') {
            self.readAllImgURL = result
          } else {
            self.readAllImgURL = ''
            self.str = result.length > textMaxLength ? result.substring(0, textMaxLength) + '...' : result
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
          self.readTextResult = result.length > textMaxLength ? result.substring(0, textMaxLength) + '...' : result
        })
        .read()
    },
    runReadImg () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.imgFile)
      fileReader
        .readAs('readAsDataURL')
        .onReadEnd(function (e, file, result) {
          if (file.type.indexOf('image/') === -1) {
            self.readImageURL = ''
            self.readImageTips.show = true
          } else {
            self.readImageURL = result
            self.readImageTips.show = false
          }
        })
        .read()
    },
    runFilter () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.filterFile)
      fileReader
        .readAs('readAsDataURL')
        .onReadEnd(function (e, file, result) {
          self.filterImageURL = result
        })
        .filter(function (f) {
          console.log(f)
          return f.type.indexOf('image/') !== -1
        })
        .read()
    },
    runReadEvent () {
      let self = this
      let fileReader = new window.SkyEyeFileRead(this.params.eventFile)
      fileReader
        .readAs(self.params.eventFileType)
        .onReadStart(function (e, file) {
          console.log('============Read Start=================')
          console.log('事件e', e)
          console.log('待读取文件file', file)
        })
        .onReadEnd(function (e, file, result) {
          console.log('============Read End=================')
          console.log('事件e', e)
          console.log('已读取文件file', file)
          console.log('文件内容result', result.length > 200 ? result.substring(0, 200) : result)
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
    },
    getFilterFileName (e) {
      this.params.filterFile = e.target.files
    },
    getEventFileName (e) {
      this.params.eventFile = e.target.files
    }
  },
  components: {
    CodePanel, LabelBrowser, LabelNode, OptionsList
  },
  ready () {}
}
