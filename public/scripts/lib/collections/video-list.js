var VideoList = Backbone.Collection.extend({
	model: Video,
	url: '/videos'
});