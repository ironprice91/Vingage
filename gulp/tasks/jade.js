var gulp = require('gulp');

gulp.task('jade', function(){
	gulp.src('**/*.jade')
	.pipe(livereload({ auto: false }))
});