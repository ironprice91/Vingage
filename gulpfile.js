var gulp = require('./gulp')([
	'gulp-concat',
	'gulp-uglify',
	'gulp-minify-css',
	'gulp-livereload'
]);


gulp.task('default', ['scripts', 'styles']);