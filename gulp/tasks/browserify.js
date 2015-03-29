var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var config = require('../config').browserify;

gulp.task('browserify', function(){
	return browserify(config.src)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.dest));
})