var Helper = require('./modules/Helper');
var async = require('async');
var _ = require('underscore');

var videos = new VideoList();

(location.href === "http://localhost:6503/" || location.href === "https://vingage.herokuapp.com/" ) ? videos.reset(bootstrappedVideos) : null;

var videoView = new VideoListView({
	attributes: {
		title: 'Video Quick View'
	},
	collection: videos
});

// New note template
var newNoteForm = '' +
	'<form id="submit-note">\
		<textarea name="note" class="new-note" placeholder="Note..."></textarea>\
		<button class="cancel-note btn btn-danger">Cancel</button>\
		<button type="submit" class="btn btn-primary pull-right submit-note-btn">Save</button>\
	<form>';

// Popover for editing notes
var notePopover = '' + '<button class="btn btn-success popover-btn edit-note">Edit  </button>\
    <button class="btn btn-danger popover-btn delete-note">Delete</button>\
    <button id="close-popover" data-toggle="clickover" class="btn btn-small btn-primary popover-btn" onclick="$(&quot;.note-row&quot;).popover(&quot;hide&quot;);">Close</button>';

var editTextarea = '' +
	'<form id="edit-note">\
		<textarea id="edit-note-form" name="editNoteForm" cols="37" rows="8"></textarea>\
		<input type="submit" class="btn btn-default">\
	</form>';


$(function(){
	// render all videos and append to body
	videoView.render();
	$('body').append(videoView.el);

	var App = function(){};

	App.prototype.init = function(){
		var self = this;
		var videoContainers = $(".container .video-note-container");

		videoContainers.each(function(){
			self.setVideo($(this));
		});
	};

	// all video command
	App.prototype.setVideo = function(parent){
		// global video variables
		var self = this;
		var video = parent.find("video");
		var videoId = video.attr("id");
		var theaterBtn = parent.find(".theater-mode");
		var deleteVidBtn = parent.find(".deleteVideo");
		var utilityBar = parent.find(".video-control-center");

		theaterBtn.on("click", function(){
			self.enableTheaterMode(video);
		});

		deleteVidBtn.on("click", function(){
			self.deleteVideo(parent, videoId);
		});

		utilityBar.each(function(){
			self.setUtility(parent, $(this), video, videoId);
		});

	};

	App.prototype.enableTheaterMode = function(el){
		console.log(el);
	};

	// I THINK THE VIDEO PLAYERS ARE GETTING RESET BECAUSE OF A CLASS CHANGE OR CSS CHANGE
	App.prototype.deleteVideo = function(parent, vidId){
		var deleteVideo = confirm('Are you sure you want to delete this video?');

		if(deleteVideo === true){
			$.post('/deleteVideo', {id: vidId}, function(responseData){

					if(responseData.success === true){
						parent.remove();
					}
			});
		}
	};

	// all utily command
	App.prototype.setUtility = function(parent, self, video,vidId){
		var commandContainer = parent.find(".list-notes");
		var note = commandContainer.find(".note-row");
		var noteId = note.attr("id");
		var popoverDelBtn = commandContainer.find(".delete-note");

		note.on("click", function(){

			$(this).popover({
				animation: true,
				content: notePopover,
				placement: 'bottom',
				html: true
			});

			$(document).on("click", ".delete-note", function(){
				var popoverEl = $(".popover");

				$.post("/deleteNote", { id: noteId, videoId: vidId }, function(res){
					console.log(res);
					if(res.success === true){
						popoverEl.prev().remove();
						popoverEl.remove();
					}
				});

			});
		});

		// pass video time to attr
		$(".set-time").on("click", function(){
			var setTime = $(this).attr("data-set-time");
			video.currentTime = Number(setTime);
		});

		// $(".edit-note").on("click", function(e){
		// 	e.preventDefault();

		// });

	};

	var APP = new App();
	APP.init();


	$('#username-input').focus();

	$(document).ready(function(){
		$('.splash-logo').removeClass('hidden');
		$('.splash-logo').fadeIn(3000);
	});


	$(document).on("click", '.edit-note', function(e){
		e.preventDefault();
		console.log($(this));
	});

	// Toggle Edit note
	$(document).on('click', '.edit-note', function(e){
		e.preventDefault();
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');

		var noteContainer = $(this).parent();
		var noteID = noteContainer.parent().prev().attr('id');

		var editTextarea = '' +
		'<form id="edit-note">\
			<textarea id="edit-note-form" name="editNoteForm" cols="37" rows="8"></textarea>\
			<input type="submit" class="btn btn-default">\
		</form>';
		console.log(noteContainer);

		$(noteContainer).append(editTextarea);
		var requestNote = '/getNote/' + videoId +'-'+noteID;
		var textareaEditor = $('#edit-note-form');

		$.get(requestNote, function(responseData){
			textareaEditor.val(responseData);
		});

		// Submit new value for note
		$(document).on('submit', '#edit-note', function(e){
			e.preventDefault();
			var updateNote = 'updateNote/' + videoId + '-' + noteID;
			var textareaEditor = $('#edit-note');

			var editedNote = textareaEditor.find('[name=editNoteForm]').val();

			// Pass the value of new note to the server
			var requestNewNote = {
				note: editedNote
			};

			$.post(updateNote, requestNewNote, function(responseData){
				var noteText = noteContainer.parent().prev().find('p').text(responseData.note);
				$('.popover').remove();
			});

		});
	});


	// Make a new note on video
	$(document).on('click', '.toggle-new-note', function(e){
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');
		var thisVideo = document.getElementById(videoId);

		thisVideo.pause();

		var tableOfNotes = videoContainer.find('table.list-notes');

		// render note
		tableOfNotes.prepend(newNoteForm);

		// Deleting note form
		$(document).on('click', '.cancel-note', function(e){
			e.preventDefault();
			$('#submit-note').remove();
		});

		// Submiting a new note
		$(document).on('submit', '#submit-note', function(e){
			e.preventDefault();
			e.stopPropagation();
			var noteValue = $(this).find('textarea').val();
			var thisTable = $(this).closest('table');
			var thisNoteTime = thisVideo.currentTime;
			var timeDisplay = Helper.timeConvert(thisNoteTime);

			$.post('/saveNote', {id:videoId, note:noteValue, time:thisNoteTime, displayTime:timeDisplay}, function(responseData){
				var noteEl = Helper.renderNote(responseData);
				thisTable.append(noteEl);
			});

			this.remove();
			thisVideo.play();
		});


	});





	// Toggle theater mode
	// $(document).on('click', '.theater-mode', function(){
	// 	var container = $(this).closest('li');
	// 	var modal = $('#theater-mode');
	// 	var videoId = container.attr('data-video-container');
	// 	var requestVideo = '/theaterMode/' + videoId;
	// 	console.log(videoId);
	// 	$.get(requestVideo, {}, function(responseData){
	// 		var video = $('.video-modal').find('video');
	// 		$('.video-theater').attr('src', responseData[0].videoSrc);
	// 		$('.video-modal').attr('src', responseData[0].videoSrc);
	// 		$('.theater-container').attr('data-video-container', videoId);
	// 		$('.video-modal').attr('id', videoId);
	// 		$('.video-modal').attr('data-video', videoId);
	// 		video.attr('src', responseData[0].videoSrc);
	// 		video.attr('id', responseData[0]._id+'_html5_api');
	// 		video.attr('data-video', responseData[0]._id);

	// 		modal.modal('show');
	// 	});

	// });


});

