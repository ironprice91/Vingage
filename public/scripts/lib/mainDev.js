var videos = new VideoList();

videos.reset(bootstrappedVideos);

var videoView = new VideoListView({
	attributes: {
		title: 'Video Quick View'
	},
	collection: videos
});

// New note template
var newNoteForm = '<form id="submit-note"><textarea name="note" class="new-note" placeholder="Note..."></textarea><button class="cancel-note btn btn-danger">Cancel</button><button type="submit" class="btn btn-primary submit-note-btn">Save</button><form>';

// Display time (refactor to use % modulus)
var timeConvert = function(num){
	var minutes = num/60;
	var wholeNumber = Math.floor(minutes);
	var seconds = num - (wholeNumber*60);
	var roundedSeconds = Math.floor((seconds));
	var secondsArray = roundedSeconds.toString().split('');

	if(secondsArray.length === 1){
		return (wholeNumber+':0'+roundedSeconds);
	} else {
		return (wholeNumber+':'+roundedSeconds);
	}
};

$(function(){
	$('#username-input').focus();

	// render all videos and append
	videoView.render();
	$('body').append(videoView.el);

	// 
	
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
		
		// Deleting note
		$(document).on('click', '.cancel-note', function(e){
			e.preventDefault();
			$('#submit-note').remove();
		});

		// Submiting a new note
		$(document).on('submit', '#submit-note', function(e){
			e.preventDefault();
			var noteValue = $(this).find('textarea').val();
			var thisTable = $(this).closest('table');
			var thisNoteTime = thisVideo.currentTime;
			var timeDisplay = timeConvert(thisNoteTime);
			console.log(thisNoteTime);
			console.log(noteValue);

			$.post('/saveNote', {id:videoId, note:noteValue, time:thisNoteTime, displayTime:timeDisplay}, function(responseData){
				console.log(responseData);
			});						
			
			thisTable.append('<tr class="note-row"><td>'+noteValue+' <a class="set-time" data-set-time="'+thisNoteTime+'">'+timeDisplay+'</a></td></tr>')

			this.remove();
		});


	});


	// deleting a single video
	$(document).on('click', '.deleteVideo', function(){
		var videoContainer = $(this).closest('li');
		var videoId = videoContainer.attr('data-video-container');

		$.post('/deleteVideo', {id: videoId}, function(responseData){
			console.log('responseData: ', responseData);
			if(responseData.success === true){
				videoContainer.remove();
			}
		});
	});

	// Set time on video
	$(document).on('click','.set-time', function(){
		console.log('test');
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');
		var thisVideo = document.getElementById(videoId);
		var setTime = $(this).attr('data-set-time');

		thisVideo.currentTime = Number(setTime);	
	});

});