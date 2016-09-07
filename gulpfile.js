/**
 * Created by yichizhang on 16/7/21.
 */
var gulp = require('gulp')
var gulpUtil = require('gulp-util')
var shell = require('shelljs')
var utils = require('./build/utils')
var taskDev = require('./build/dev')
var taskPro = require('./build/pro')
var taskLib = require('./build/lib')
var defineVars = require('./config.custom.js').defineVars

utils.startBanner()

/* 项目 */
gulp.task('dev', taskDev)
gulp.task('pro', taskPro)

/* lib */
// 编译
gulp.task('lib-normal', function (callback) {
  taskLib({ min: false }, callback)
})
// 编译且压缩
gulp.task('lib-min', [ 'lib-normal' ], function (callback) {
  taskLib({ min: true }, callback)
})
// 移动dist
gulp.task('mv-dist', [ 'lib-min' ], function () {
  return gulp.src(defineVars.distTarDir)
    .pipe(gulp.dest(defineVars.downloadsDir + '/' + defineVars.distName))
})
// 打包dist
gulp.task('tar-dist', [ 'mv-dist' ], function () {
  gulpUtil.log('Tar:', defineVars.distTarName)
  shell.exec('cd ' + defineVars.downloadsDir + ' && tar -czf ' + defineVars.distTarName + ' ./' + defineVars.distName)
})
// 移动source
gulp.task('mv-source', [ 'lib-min' ], function () {
  return gulp.src(defineVars.sourceTarDir)
    .pipe(gulp.dest(defineVars.downloadsDir + '/' + defineVars.sourceName))
})
// 打包source
gulp.task('tar-source', [ 'mv-source' ], function () {
  gulpUtil.log('Tar:', defineVars.sourceTarName)
  shell.exec('cd ' + defineVars.downloadsDir + ' && tar -czf ' + defineVars.sourceTarName + ' ./' + defineVars.sourceName)
})

gulp.task('lib', [ 'lib-normal', 'lib-min', 'mv-dist', 'mv-source', 'tar-dist', 'tar-source' ])
