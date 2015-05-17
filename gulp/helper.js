var gutil = require('gulp-util');

module.exports = {
	handleError: function(err) {
  		gutil.log(gutil.colors.red(err.toString()));
  		this.emit('end');
	}
};