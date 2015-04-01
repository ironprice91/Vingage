var mongoose = require('mongoose');

console.log(User);
// AWS video Schema
var videoSchema = mongoose.Schema({
	title: String,
	videoSrc: String,
	notes: [{
		time: Number,
		displayTime: String,
		note: String
	}]
});

module.exports =  mongoose.model('video', videoSchema);
