var mongoose = require('mongoose');
var User = require('./user');
var UserId = User._id;

// AWS video Schema
var videoSchema = mongoose.Schema({
	title: String,
	videoSrc: String,
  owners: [UserId],
	notes: [{
		time: Number,
		displayTime: String,
		note: String
	}]
});

module.exports = mongoose.model('video', videoSchema);
