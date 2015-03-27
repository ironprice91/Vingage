var gulp = require('./gulp')([
	'scripts'
	// 'gulp-minify-css',
	// 'gulp-livereload'
]);

gulp.task('default', ['scripts', 'styles']);