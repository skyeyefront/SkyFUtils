/**
 * Created by yichizhang on 16/7/21.
 */
var gulp = require('gulp')
var gulpUtil = require('gulp-util')
var shell = require('shelljs')
var config = require('./build/config')
var utils = require('./build/utils')
var taskDev = require('./build/dev')
var taskPro = require('./build/pro')
var taskLib = require('./build/lib')

gulp.task('init', function (cb) {
  utils.startBanner()
  var versionInfo = utils.getVersionInfo()
  if (versionInfo.isEq) {
    cb()
  } else {
    gulpUtil.log('"./package.json(' + versionInfo.packageVersion + ')"和"src/libenv/package.json(' + versionInfo.libVersion + ')"中的version信息不一致!!!')
  }
})

/* 项目 */
gulp.task('dev', [ 'init' ], taskDev)
gulp.task('pro', [ 'init' ], taskPro)

/* lib */
// 编译
gulp.task('lib-normal', [ 'init' ], function (callback) {
  taskLib({ min: false }, callback)
})
// 编译且压缩
gulp.task('lib-min', [ 'lib-normal' ], function (callback) {
  taskLib({ min: true }, callback)
})
// 移动dist
gulp.task('mv-dist', [ 'lib-min' ], function () {
  return gulp.src(config.libDistTarDir)
    .pipe(gulp.dest(config.libNfsAbsolutePath + '/' + config.libDistName))
})
// 打包dist
gulp.task('tar-dist', [ 'mv-dist' ], function () {
  gulpUtil.log('tar:', config.libDistTarName)
  shell.exec('cd ' + config.libNfsAbsolutePath + ' && tar -czf ' + config.libDistTarName + ' ./' + config.libDistName)
})
// 删除dist
gulp.task('rm-dist', [ 'tar-dist' ], function () {
  gulpUtil.log('rm:', config.libDistName)
  shell.exec('rm -rf ' + config.libNfsAbsolutePath + '/' + config.libDistName)
})
// 移动source
gulp.task('mv-source', [ 'lib-min' ], function () {
  return gulp.src(config.libSourceTarDir)
    .pipe(gulp.dest(config.libNfsAbsolutePath + '/' + config.libSourceName))
})
// 打包source
gulp.task('tar-source', [ 'mv-source' ], function () {
  gulpUtil.log('tar:', config.libSourceTarName)
  shell.exec('cd ' + config.libNfsAbsolutePath + ' && tar -czf ' + config.libSourceTarName + ' ./' + config.libSourceName)
})
// 删除source
gulp.task('rm-source', [ 'tar-source' ], function () {
  gulpUtil.log('rm:', config.libSourceName)
  shell.exec('rm -rf ' + config.libNfsAbsolutePath + '/' + config.libSourceName)
})
// lib
gulp.task('lib', [ 'lib-normal', 'lib-min', 'mv-dist', 'mv-source', 'tar-dist', 'tar-source', 'rm-dist', 'rm-source' ])
