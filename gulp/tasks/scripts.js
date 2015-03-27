var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('../config').scripts;

// 'scripts' is runnable
gulp.task('scripts', function(){
	gulp.src(config.src) //files to input
	.pipe(concat('main.js')) //concat
	.pipe(uglify()) //minify
	.pipe(gulp.dest(config.dest)); //write to output
});