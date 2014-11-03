// Only automating client side code
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');

var paths = {
	scripts: 'public/scripts/**/*.js',
	scriptsDest: 'public/scripts',
	styles: 'public/stylesheets/**/*.css',
	stylesDest: 'public/styles'
};

// 'scripts' is runnable
gulp.task('scripts', function(){
	gulp.src(paths.scripts) //files to input
	.pipe(concat('main.js')) //concat
	.pipe(uglify()) //minify
	.pipe(gulp.dest(paths.scriptsDest)) //write to output
});

gulp.task('styles', function(){
	gulp.src(paths.styles) //files to input
	.pipe(concat('main.css')) //concat
	.pipe(minifycss()) //minify
	.pipe(gulp.dest(paths.stylesDest)) //write to output
	.pipe(livereload({ auto: false }))
});

// define gulp task then run 'gulp watch' once to watch files
gulp.task('watch', function(){
	// startes live reload server (line below)
	livereload.listen();
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles']);