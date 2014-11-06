// client side view for all videos
var VideoListView = Backbone.View.extend({
	template: Handlebars.compile( $('#video-list').html()),
	initialize: function(){
		this.setElement(
			this.template(
				this.attributes
			)
		);
		this.listenTo(this.collection, 'all', this.render);
	},

	render: function(){
		var videoViews = this.collection.map(function(video){
			var videoView = new VideoView({model : video});
			videoView.render();
			return videoView.el;
		});

		this.$('.videos').empty().append(videoViews);
	}

});