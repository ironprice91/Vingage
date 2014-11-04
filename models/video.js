var mongoose = require('mongoose');

// AWS video Schema
var videoSchema = mongoose.Schema({
	videoUrl: String,
	title: String,
	bookmark: [{
		time: Number,
		note: [String]
	}]
});

module.exports = mongoose.model('video', videoSchema);