var mongoose = require('mongoose');

// AWS video Schema
var videoSchema = mongoose.Schema({
	title: String,
	videoSrc: String,
	notes: [{
		time: Number,
		note: String
	}]
});

module.exports = mongoose.model('video', videoSchema);