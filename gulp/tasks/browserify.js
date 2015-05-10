var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var config = require('../config').browserify;
var helper = require('../helper');


gulp.task('browserify', function(){
	return browserify(config.src)
	.bundle()
	.on('error', helper.handleError)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.dest));
})