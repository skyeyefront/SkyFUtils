/**
 * Created by yichizhang on 16/7/21.
 */
var gulp = require('gulp')
var utils = require('./build/utils')
var taskDev = require('./build/dev')
var taskPro = require('./build/pro')
var taskLib = require('./build/lib')

utils.startBanner()
gulp.task('dev', taskDev)
gulp.task('pro', taskPro)
gulp.task('lib-normal', function (callback) {
  taskLib({ min: false }, callback)
})
gulp.task('lib', [ 'lib-normal' ], function (callback) {
  taskLib({ min: true }, callback)
})
