// Uncomment to have a seed db entry
var mongoose = require('mongoose');
var Video = require('../video.js');

Video.find({}, function(err, results){
	if(results.length === 0){
		var videoGuy = new Video({
			title: 'BackboneJS',
			videoSrc: 'https://s3.amazonaws.com/refactoru/public/Backbonejs+Tutorial+-+Beginners.mp4',
			notes: [{
				time: 6,
				displayTime: "0:06",
				note: 'This is a note I want on the page'
			}]
		});
	videoGuy.save();
	}	
});