var gulp = require('gulp');
var config = require('../config');


// 'scripts' is runnable
gulp.task('scripts', function(){
	gulp.src('public/scripts/lib/**/*.js') //files to input
	.pipe(concat('main.js')) //concat
	.pipe(uglify()) //minify
	.pipe(gulp.dest('public/scripts')) //write to output
});

