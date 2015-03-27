var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var config = require('../config').styles;

gulp.task('styles', function(){
	gulp.src(config.src)
	.pipe(concat('main.css'))
	.pipe(minifycss())
	.pipe(gulp.dest(config.dest))
	.pipe(livereload({ auto: false }))
});