module.exports = {
	scripts: {
		src: ['public/scripts/lib/models/*.js', 'public/scripts/lib/collections/*.js', 'public/scripts/lib/views/*.js', 'public/scripts/lib/bundle.js'],
		dest: 'public/scripts'
	},
	styles: {
		src: 'public/stylesheets/lib/**/*.css',
		dest: 'public/stylesheets'
	},
	jade: {
		src: '**/*.jade'
	}
};