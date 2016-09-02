/**
 * Created by huangxinxin on 16/8/11.
 * 配置请勿随意修改, 除非你熟练使用webpack
 */
var path = require('path')

// context
exports.contextAbsolutePath = path.resolve(__dirname, '../')

// package.json
var PACKAGE_JSON = require('../package.json')
exports.PACKAGE_JSON = PACKAGE_JSON

// templates
var templatesRelativePath = clearPathLastChar('../' + PACKAGE_JSON._addons.templatesRelativePath)
var templatesAbsolutePath = path.resolve(__dirname, templatesRelativePath)
exports.templatesRelativePath = templatesRelativePath
exports.templatesAbsolutePath = templatesAbsolutePath

// dist(output)
var distRelativePath = '../dist'
var distAbsolutePath = path.resolve(__dirname, distRelativePath)
var distPublicPath = addPathLastChar(PACKAGE_JSON._addons.distPublicPath)
var distProRelativePath = clearPathLastChar('../' + PACKAGE_JSON._addons.distRelativePath)
var distProAbsolutePath = path.resolve(__dirname, distProRelativePath)
exports.distRelativePath = distRelativePath
exports.distAbsolutePath = distAbsolutePath
exports.distPublicPath = distPublicPath
exports.distProRelativePath = distProRelativePath
exports.distProAbsolutePath = distProAbsolutePath

// assets
var assetsRelativePath = '../assets'
var assetsAbsolutePath = path.resolve(__dirname, assetsRelativePath)
exports.assetsRelativePath = assetsRelativePath
exports.assetsAbsolutePath = assetsAbsolutePath

// src
var srcRelativePath = '../src'
var srcAbsolutePath = path.resolve(__dirname, srcRelativePath)
exports.srcRelativePath = srcRelativePath
exports.srcAbsolutePath = srcAbsolutePath

// entry
var entryRelativePath = srcRelativePath + '/entry'
var entryAbsolutePath = path.resolve(__dirname, entryRelativePath)
exports.entryRelativePath = entryRelativePath
exports.entryAbsolutePath = entryAbsolutePath

// libenv
var libEnvRelativePath = srcRelativePath + '/libenv'
var libEnvAbsolutePath = path.resolve(__dirname, libEnvRelativePath)
exports.libEnvRelativePath = libEnvRelativePath
exports.libEnvAbsolutePath = libEnvAbsolutePath

// views
var viewsRelativePath = '../views'
var viewsAbsolutePath = path.resolve(__dirname, viewsRelativePath)
exports.viewsRelativePath = viewsRelativePath
exports.viewsAbsolutePath = viewsAbsolutePath

// webpack-assets.json
var webpackAssetsJsonRelativePath = '../webpack-assets.json'
var webpackAssetsJsonAbsolutePath = path.resolve(__dirname, webpackAssetsJsonRelativePath)
exports.webpackAssetsJsonRelativePath = webpackAssetsJsonRelativePath
exports.webpackAssetsJsonAbsolutePath = webpackAssetsJsonAbsolutePath

/**
 * 去掉末尾'/'字符
 * @param str
 * @returns {*}
 */
function clearPathLastChar (str) {
  var l = str.length
  var c = str.charAt(l - 1)
  if (c === '/') {
    str = str.slice(0, l - 1)
  }
  return str
}

/**
 * 末尾增加'/'字符
 * @param str
 * @returns {*}
 */
function addPathLastChar (str) {
  var l = str.length
  var c = str.charAt(l - 1)
  if (c !== '/') {
    str = str + '/'
  }
  return str
}
