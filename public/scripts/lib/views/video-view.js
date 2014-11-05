var VideoView = Backbone.View.extend({
	template: Handlebars.compile($('#video-tpl').html()),
	render: function(){
		this.setElement(
			this.template(
				this.model.toJSON()
			)
		);
	}
});