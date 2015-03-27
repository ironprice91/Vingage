var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

gulp.task('styles', function(){
	gulp.src('public/stylesheets/lib/**/*.css') //files to input
	.pipe(concat('main.css')) //concat
	.pipe(minifycss()) //minify
	.pipe(gulp.dest('public/stylesheets')) //write to output
	.pipe(livereload({ auto: false }))
});