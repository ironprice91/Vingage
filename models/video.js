var mongoose = require('mongoose');

// AWS video Schema
var videoSchema = mongoose.Schema({
	videoUrl: String
});

module.exports = mongoose.model('video', videoSchema);