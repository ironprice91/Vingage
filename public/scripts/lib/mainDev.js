var Helper = require('./Helper');


var videos = new VideoList();

videos.reset(bootstrappedVideos);

var videoView = new VideoListView({
	attributes: {
		title: 'Video Quick View'
	},
	collection: videos
});

// New note template
var newNoteForm = '<form id="submit-note"><textarea name="note" class="new-note" placeholder="Note..."></textarea><button class="cancel-note btn btn-danger">Cancel</button><button type="submit" class="btn btn-primary pull-right submit-note-btn">Save</button><form>';

// Popover for editing notes
var notePopover = '<button class="btn btn-success popover-btn edit-note">Edit  </button>'+
    '<button class="btn btn-danger popover-btn delete-note">Delete</button>'+
    '<button id="close-popover" data-toggle="clickover" class="btn btn-small btn-primary popover-btn" onclick="$(&quot;.note-row&quot;).popover(&quot;hide&quot;);">Close</button>';


$(function(){
	$('#username-input').focus();

	$(document).ready(function(){
		$('.splash-logo').removeClass('hidden');
		$('.splash-logo').fadeIn(3000);
	});

	// render all videos and append
	videoView.render();
	$('body').append(videoView.el);

	// toggle popover
	$(document).on('click', '.note-row', function(e){
		e.stopPropagation();
		$('.note-row').popover({
			animation: true,
			content: notePopover,
			placement: 'left',
			html: true
		});
	});

	// Delete note
	$(document).on('click', '.delete-note', function(){
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoID = video.attr('id');

		var noteContainer = $(this).parent();
		var noteID = noteContainer.parent().prev().attr('id'); 

		$.post('/deleteNote', {id: noteID, videoId: videoID}, function(responseData){
			console.log('responseData.success: ', responseData.success);
			if(responseData.success === true){
				$('#'+noteID).remove();
				$('.popover').remove();
			}
		});
	});

	// Toggle Edit note
	$(document).on('click', '.edit-note', function(e){
		e.preventDefault();
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');

		var noteContainer = $(this).parent();
		var noteID = noteContainer.parent().prev().attr('id');

		var editTextarea = '<form id="edit-note"><textarea id="edit-note-form" name="editNoteForm" cols="37" rows="8"></textarea><input type="submit" class="btn btn-default"></form>';

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


	// deleting a single video
	$(document).on('click', '.deleteVideo', function(){
		var videoContainer = $(this).closest('li');
		var videoId = videoContainer.attr('data-video-container');
		// var deleteVideo = confirm('Are you sure you want to delete this video?');

		// if(deleteVideo === true){
			$.post('/deleteVideo', {id: videoId}, function(responseData){
				console.log('responseData: ', responseData);
					if(responseData.success === true){
						videoContainer.remove();
					}
			});
		// }
	});

	// Set time on video
	$(document).on('click','.set-time', function(e){
		e.stopPropagation();
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');
		var thisVideo = document.getElementById(videoId);
		var setTime = $(this).attr('data-set-time');

		thisVideo.currentTime = Number(setTime);	
	});

	// Toggle theater mode
	$(document).on('click', '.theater-mode', function(){
		var container = $(this).closest('li');
		var modal = $('#theater-mode');
		var videoId = container.attr('data-video-container');
		var requestVideo = '/theaterMode/' + videoId;
		console.log(videoId);
		$.get(requestVideo, {}, function(responseData){
			var video = $('.video-modal').find('video');
			$('.video-theater').attr('src', responseData[0].videoSrc);
			$('.video-modal').attr('src', responseData[0].videoSrc);
			$('.theater-container').attr('data-video-container', videoId);
			$('.video-modal').attr('id', videoId);
			$('.video-modal').attr('data-video', videoId);
			video.attr('src', responseData[0].videoSrc);
			video.attr('id', responseData[0]._id+'_html5_api');
			video.attr('data-video', responseData[0]._id);

			modal.modal('show');
		});

	});


});

