var mongoose = require('mongoose');
var Video = require('../video.js');

Video.find({}, function(err, results){
	if(results.length === 0){
		var videoGuy = new Video({
			videoUrl: 'url'
		});
	videoGuy.save();
	}	
});