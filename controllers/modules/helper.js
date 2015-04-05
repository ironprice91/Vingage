var Helper = {};

// function to remove videojs id concat
Helper.realId = function(string){
	return string.replace(/_html5_api/, '');
};

Helper.idSplitter = function(string){
	return string.split(/_html5_api-/);
};

module.exports = Helper;