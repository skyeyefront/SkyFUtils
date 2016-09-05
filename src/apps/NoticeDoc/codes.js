/**
 * Created by huangxinxin on 16/9/5.
 */
export const codes1 = [
  'var notice = new window.SkyEyeNotice()'
]
export const codes2 = [
  '// lib 为本地安装时的变量',
  'var lib = SkyFUtils.install({globalInstall: false })',
  'var notice = new lib.SkyEyeNotice()'
]
export const codes3 = [
  'notice.setOptions({...})'
]
export const codes4 = [
  'notice.setEvents({...})'
]
export const codes5 = [
  'notice.show("这里写Title", {body: "Hi, 这里写消息主体文本"})'
]
export const codes6 = [
  'notice.setOptions({',
  '  dir: "auto"',
  '  lang: "UTF-8"',
  '  body: "这里是正文 2"',
  '  tag: "tag-1"',
  '  icon: "http://10.16.66.42:5011/favicon.png"',
  '  data: {name: "skyeye"}',
  '  renotify: true',
  '})',
  'notice.show("这里写Title 2")'
]
export const codes7 = [
  'notice.show("这里写Title 3", {',
  '  dir: "auto"',
  '  lang: "UTF-8"',
  '  body: "这里是正文 3"',
  '  tag: "tag-2"',
  '  icon: "/assets/images/favicon.png"',
  '  data: {name: "hi, skyeye"}',
  '  renotify: true',
  '})'
]
export const codes8 = [
  'notice',
  '  .setEvents({',
  '    onclick: function (...args) {',
  '      console.log("Notice onClick", ...args)',
  '    },',
  '    onclose: function (...args) {',
  '       console.log("Notice onClose", ...args)',
  '    },',
  '    onerror: function (...args) {',
  '       console.log("Notice onError", ...args)',
  '    },',
  '    onshow: function (...args) {',
  '       console.log("Notice onShow", ...args)',
  '    }',
  '  })',
  '  .show("这里写Title 4", {body: "这里是正文 4"})'
]
export const codes9 = [
  'notice',
  '  .show("这里写Title 5", {body: "这里是正文 5"}, {',
  '    onclick: function (...args) {',
  '      console.log("Notice onClick", ...args)',
  '    },',
  '    onclose: function (...args) {',
  '       console.log("Notice onClose", ...args)',
  '    },',
  '    onerror: function (...args) {',
  '       console.log("Notice onError", ...args)',
  '    },',
  '    onshow: function (...args) {',
  '       console.log("Notice onShow", ...args)',
  '    }',
  '  })'
]
