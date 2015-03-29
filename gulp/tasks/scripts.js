var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('../config').scripts;

// 'scripts' is runnable
gulp.task('scripts', function(){
	gulp.src(config.src)
	.pipe(concat('main-min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(config.dest));
});