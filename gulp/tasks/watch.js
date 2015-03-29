var gulp = require('gulp');
var livereload = require('gulp-livereload');
var config = require('../config');

// // define gulp task then run 'gulp watch' once to watch files
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(config.scripts.src, ['scripts']);
	gulp.watch(config.styles.src, ['styles']);
	gulp.watch(config.jade.src, ['jade']);
	gulp.watch(config.browserify.src, ['browserify']);
});