// define gulp task then run 'gulp watch' once to watch files
gulp.task('watch', function(){
	// startes live reload server (line below)
	livereload.listen();
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.jade, ['jade']);
});