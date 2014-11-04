var mongoose = require('mongoose');
var Video = require('../video.js');

Video.find({}, function(err, results){
	if(results.length === 0){
		var videoGuy = new Video({
			videoUrl: '7e7a0ab2bcc5a3c73fb3ba5906538fe8.mp4',
			title: 'Bunny',
			bookmark: [{
				time: 6,
				note: ['This is a note I want on the page']
			}]
		});
	videoGuy.save();
	}	
});