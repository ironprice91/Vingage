module.exports = {
	timeConvert: function(num){
		var min = Math.floor(num/60),
		seconds = num - (min*60),
		roundedSeconds = Math.floor((seconds)),
		secondsArray = roundedSeconds.toString().split('');

		if(secondsArray.length === 1){
			return (wholeNumber+':0'+roundedSeconds);
		} else {
			return (wholeNumber+':'+roundedSeconds);
		}
	},
	renderNote: function(noteData){
		var el = $('<tr>');
		el.attr('data-note', noteData._id);
		el.attr('id', noteData._id);
		el.attr('class', 'note-row');
		el.append('<td><button class="set-time btn btn-default" data-set-time="'+noteData.time+'">'+noteData.displayTime+'</button><p>'+noteData.note+'</p></td>');

		return el;
	}
};