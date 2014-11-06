// client side model
var Video = Backbone.Model.extend({
	idAttributes: '_id',
	defaults: {
		title: 'Why Internet Explorer is the best',
		videoSrc: '',
		notes: [{
			time: 0,
			note: ''
		}]
	}
});