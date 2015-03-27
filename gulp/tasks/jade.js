var gulp = require('gulp');
var config = require('../config').jade;

gulp.task('jade', function(){
	gulp.src(config.src)
	.pipe(livereload({ auto: false }))
});