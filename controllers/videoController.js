var Video = require('../models/video.js');

// function to remove videojs id concat
var realId = function(string){
	return string.replace(/_html5_api/,'');
};

var videoController = {
	deleteVideo: function(req,res){
		var videoId = req.body.id;
		console.log('video ID:', videoId);

		Video.remove({_id: videoId}, function(err, result){
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	},
	// Add note to specific id
	addNote : function(req,res){
		var videoId = req.body.id;		
		var videoData = req.body
		var id = realId(videoId);

		var oneNote = {
			time: videoData.time,
			displayTime: videoData.displayTime,
			note: videoData.note 
		};

		Video.findOneAndUpdate({_id: id}, {$push: {notes:oneNote}}, {safe: true, upsert:true}, function(err, result){
				if(err){
					console.log(err);	
				} else {
					console.log(result);	
				}	
		});
	},
	deleteNote: function(req,res){
		var noteID = req.body.id;
		var id = realId(noteID);
		var video = req.body.videoId;
		var realVideoID = realId(video);

		Video.update({_id: realVideoID}, {$pull: {"notes" : {_id:id}}}, function(err, result){
			console.log(realVideoID);
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	},
	getNote: function(req,res){
		var id = req.params.id;
		Video.findOne({_id:id}, function(err, result){
			// console.log(result.notes[0].note);
			res.send(result.notes[0].note);
		});
	},
	updateNote: function(req,res){
		var noteData = req.body;
		Video.findById(noteData.id, function(err, result){
			result.note = noteData.note;
			result.save(function(err, result){
				res.send(result);
			});
		});
	},
	theaterMode: function(req, res){
		var videoId = req.body.id;
		var id = realId(videoId);
		Video.findOne({_id: id}, function(err, result){
			console.log(result);
			res.send(result);
		});
	}
};

module.exports = videoController;