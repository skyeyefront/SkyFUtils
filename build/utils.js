var config = require('./config.js')
var webpack = require('webpack')
var fs = require('fs')
var ejs = require('ejs')
var gulp = require('gulp')
var gulpUglify = require('gulp-uglify')
var gulpCleanCss = require('gulp-clean-css')
var skyFUtils = require('skyfutils/dist/skyfutils.js').install({ env: 'node', globalInstall: false })

/**
 * 启动Banner
 */
function startBanner () {
  var str = skyFUtils.SkyEyeBanner(config.packageName, { notPrint: true, wordSpace: 2 })
  process.stdout.write('\n' + str + '\n')
}
exports.startBanner = startBanner

/**
 * 获取版本信息
 * @returns {boolean}
 */
function getVersionInfo () {
  return {
    libVersion: config.libVersion,
    packageVersion: config.packageVersion,
    get isEq () {
      return this.libVersion === this.packageVersion
    }
  }
}
exports.getVersionInfo = getVersionInfo

/**
 * banner 信息
 * @returns {string}
 */
function banner () {
  return config.PACKAGE_JSON.name + '\n' +
    'Version: ' + config.PACKAGE_JSON.version + '\n' +
    'Author: ' + config.PACKAGE_JSON.author + '\n' +
    'Group: ' + config.PACKAGE_JSON._addons.group + '\n' +
    'Build Time: ' + new Date().toLocaleString()
}
exports.banner = banner

/**
 * 变量定义
 * @param env
 * @constructor
 */
function SkyEyeDefinePlugin (env, defineVars) {
  var v = {
    'ENV': env,
    'PACKAGE_JSON': config.PACKAGE_JSON
  }
  if (defineVars) {
    v.defineVars = defineVars
  }
  return new webpack.DefinePlugin({
    'process.SkyEye': JSON.stringify(v)
  })
}
exports.SkyEyeDefinePlugin = SkyEyeDefinePlugin

/**
 * 字符串加边框(不支持中文)
 * @param str
 */
function strBordered (str) {
  str = '| ' + str.replace(/\n/g, ' ').replace(/\t/g, ' ') + ' |'
  var str1 = '\n' + ('-').repeat(str.length) + '\n'
  return str1 + str + str1
}
exports.strBordered = strBordered

/**
 * 获取webpack-assets.json
 * @returns {*}
 */
function getWebpackAssetsJson () {
  if (!fs.existsSync(config.webpackAssetsJsonAbsolutePath)) {
    throw new Error('webpack 还未打包完成')
  }
  return require(config.webpackAssetsJsonAbsolutePath)
}
exports.getWebpackAssetsJson = getWebpackAssetsJson

/**
 * ejs渲染成html
 * @param ejsFile
 * @param data
 * @returns {string}
 */
function renderEjsToHtml (ejsFile, data, cb) {
  if (!fs.existsSync(ejsFile)) {
    throw new Error('`' + ejsFile + '`文件不存在')
  }
  ejs.renderFile(ejsFile, data, {}, cb)
}
exports.renderEjsToHtml = renderEjsToHtml

/**
 * 获取指定chunk的资源路径
 * @param arr
 * @param chunk
 * @returns {*}
 */
function getThisChunkAssetsPath (arr, chunk) {
  var tmp = arr.filter(function (ext) {
    return ext.chunk.indexOf(chunk) !== -1
  }).map(function (ext) {
    return ext.path
  })
  if (tmp.length) {
    return tmp
  } else {
    return null
  }
}
exports.getThisChunkAssetsPath = getThisChunkAssetsPath

/**
 * 拷贝文件至生产模式发布目录
 * @param oldPath
 * @returns {*}
 */
function copyFileToDistProAbsolutePath (oldPath) {
  var fName = oldPath.split('/').pop()
  var ext = fName.split('.').pop()
  var src = config.contextAbsolutePath + oldPath
  var des = config.distProAbsolutePath
  var task = gulp.src(src)
  if (ext === 'js') {
    task.pipe(gulpUglify())
  } else if (ext === 'css') {
    task.pipe(gulpCleanCss())
  }
  task.pipe(gulp.dest(des))
  return config.distPublicPath + fName
}
exports.copyFileToDistProAbsolutePath = copyFileToDistProAbsolutePath

/**
 * 获取指定chunk的资源
 * @param customConfig
 * @param chunk
 * @returns {{}}
 */
function getThisChunkAssets (customConfig, chunk) {
  var assets = {}
  var favicon = getThisChunkAssetsPath(customConfig.assets.favicon, chunk)
  if (favicon) {
    assets.favicon = favicon.pop() // string
  }
  assets.css = getThisChunkAssetsPath(customConfig.assets.css, chunk) // array
  assets.externals = getThisChunkAssetsPath(customConfig.externals, chunk) // array
  assets.webpack = getWebpackAssetsJson() // object
  return assets
}
exports.getThisChunkAssets = getThisChunkAssets

/**
 * Less Loader
 * @param styleHash
 * @returns {string}
 */
function lessLoader (styleHash) {
  return 'css-loader?modules&importLoaders=1&localIdentName=[local]' + (styleHash ? '-[hash:base64:7]' : '') + // [name] 文件名 [local]原始样式名
    '!postcss-loader' +
    '!less-loader'
}
exports.lessLoader = lessLoader

/**
 * 自定义配置合并
 * @param conf
 * @returns {{}}
 */
function mergeCustomConfig (conf) {
  var customConfigMerged = {
    esLint: true,
    styleLint: true,
    styleHash: true,
    defineVars: null,
    entryArray: [],
    vendor: [],
    externals: [],
    provide: {},
    assets: {
      favicon: [],
      css: []
    },
    alias: {},
    devServer: {
      port: 3000,
      proxy: null
    }
  }
  if (conf instanceof Object) {
    customConfigMerged.defineVars = conf.defineVars
    if (typeof conf.esLint === 'boolean') {
      customConfigMerged.esLint = conf.esLint
    }
    if (typeof conf.styleLint === 'boolean') {
      customConfigMerged.styleLint = conf.styleLint
    }
    if (typeof conf.styleHash === 'boolean') {
      customConfigMerged.styleHash = conf.styleHash
    }
    if (conf.entryArray instanceof Array) {
      customConfigMerged.entryArray = conf.entryArray.filter(function (item) {
        return item.hasOwnProperty('name') && item.hasOwnProperty('router')
      })
    }
    if (conf.vendor instanceof Array) {
      customConfigMerged.vendor = conf.vendor.filter(function (item) {
        return typeof item === 'string'
      })
    }
    if (conf.externals instanceof Array) {
      customConfigMerged.externals = conf.externals.filter(function (item) {
        return item.hasOwnProperty('package') && item.hasOwnProperty('var') && item.hasOwnProperty('path') && item.hasOwnProperty('chunk')
      })
    }
    if (conf.provide instanceof Object) {
      for (var k in conf.provide) {
        if (typeof conf.provide[ k ] === 'string') {
          customConfigMerged.provide[ k ] = conf.provide[ k ]
        }
      }
    }
    if (conf.assets instanceof Object) {
      if (conf.assets.favicon instanceof Array) {
        customConfigMerged.assets.favicon = conf.assets.favicon.filter(function (item) {
          return item.hasOwnProperty('path') && item.hasOwnProperty('chunk')
        })
      }
      if (conf.assets.css instanceof Array) {
        customConfigMerged.assets.css = conf.assets.css.filter(function (item) {
          return item.hasOwnProperty('path') && item.hasOwnProperty('chunk')
        })
      }
    }
    if (conf.alias instanceof Object) {
      for (var k1 in conf.alias) {
        if (typeof conf.alias[ k1 ] === 'string') {
          customConfigMerged.alias[ k1 ] = conf.alias[ k1 ]
        }
      }
    }
    if (conf.devServer instanceof Object) {
      if (!isNaN(+conf.devServer.port)) {
        customConfigMerged.devServer.port = conf.devServer.port
      }
      if (typeof conf.devServer.host === 'string') {
        customConfigMerged.devServer.host = conf.devServer.host
      }
      if (conf.devServer.proxy instanceof Array) {
        customConfigMerged.devServer.proxy = conf.devServer.proxy.filter(function (item) {
          return item.hasOwnProperty('path') && item.hasOwnProperty('config')
        })
      } else if (conf.devServer.proxy instanceof Function) {
        customConfigMerged.devServer.proxy = conf.devServer.proxy
      }
    }
  }
  return customConfigMerged
}
exports.mergeCustomConfig = mergeCustomConfig
