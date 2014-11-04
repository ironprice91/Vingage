var video = document.getElementById(file.Key);
console.log(file.Key);

var setCurTime = function(){
	video.currentTime = 5;
};

var getCurTime = function(){
	console.log(video.currentTime);
};


var candyBag = new Candy({
	name: 'Test KitKat',
	calories: 500
});

// chapter marking test

