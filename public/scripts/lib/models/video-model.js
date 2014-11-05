// client side model
var Video = Backbone.Model.extend({
	idAttributes: '_id',
	defaults: {
		title: 'I love Internet Explorer',
		videoSrc: '',
		notes: [{
			time: 0,
			note: ''
		}]
	}
});