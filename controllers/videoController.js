var Video = require('../models/video.js');
var Helper = require('./modules/helper');


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
		var id = Helper.idFunc(videoId, false);

		var oneNote = {
			time: videoData.time,
			displayTime: videoData.displayTime,
			note: videoData.note
		};

		Video.findOneAndUpdate({_id: id}, {$push: {notes:oneNote}}, {safe: true, upsert:true}, function(err, result){
				if(err){
					console.log(err);
				} else {
					res.send(result.notes[result.notes.length-1]);
				}
		});
	},
	deleteNote: function(req,res){
		var noteID = req.body.id;
		var id = Helper.idFunc(noteID, false);
		var video = req.body.videoId;
		var realVideoID = Helper.idFunc(video, false);
		console.log('realVideoID', realVideoID);
		Video.update({_id: realVideoID}, {$pull: {"notes" : {_id:id}}}, function(err, result){
			console.log(realVideoID);
			console.log('TEST!', result);
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	},
	getNote: function(req,res){
		var id = req.params.id;
		var videoId = Helper.idFunc(id, true).shift();
		var noteId = Helper.idFunc(id, true).pop();
		console.log('michael', noteId);
		Video.find({_id:videoId}, function(err, doc){
			var note = doc[0].notes.id(noteId);
			console.log('note', note);
			res.send(note.note);
		});
	},
	updateNote: function(req,res){
		var noteData = req.params.id;
		var newNote = req.body.note;
		var videoId = Helper.idFunc(noteData, true).shift();
		var noteId = Helper.idFunc(noteData, true).pop();
		console.log(noteId);
		console.log('videoId', videoId);
		console.log('edited note value', noteData);
		Video.update({_id:videoId, "notes._id":noteId}, {$set: {"notes.$.note":newNote}}, function(err, result,  status){
				res.send({
					err: err,
					result:result,
					success: err === null,
					note: newNote
				});
		});
	},
	theaterMode: function(req, res){
		var videoId = req.params.id;
		Video.find({_id: videoId}, function(err, result){
			console.log(result);
			res.send(result);
		});
	}
};

module.exports = videoController;