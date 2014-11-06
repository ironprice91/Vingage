var VideoView = Backbone.View.extend({
	template: Handlebars.compile($('#video-tpl').html()),
	render: function(){
		this.setElement(
			this.template(
				this.model.toJSON()
			)
		);
	},
	events: {
		'click .deleteVideo' : 'deleteVideo' 
	},
	deleteVideo: function(){
		console.log(this.model.attributes._id);
		this.model.destroy();
	}
});