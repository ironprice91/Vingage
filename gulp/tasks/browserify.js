var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var config = require('../config').browserify;

gulp.task('browserify', function(){
	return browserify(config.src)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.dest));
})