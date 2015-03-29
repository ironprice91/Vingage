var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

// var bundler = watchify(browserify(watchify.args));

gulp.task('browserify', function(){
	return browserify('./public/scripts/lib/mainDev.js')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./public/scripts/lib/'))
})