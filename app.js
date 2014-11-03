var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');

// This allows express to parse incoming files from forms
var multer = require('multer');

var indexController = require('./controllers/index.js');

// Connect to our database called: videoApp
mongoose.connect('mongodb://localhost/vidup');
require('./models/seeds/videoSeed.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
app.get('/view', indexController.view);
app.post('/submitPublic', multer(), indexController.submitPublic);
app.post('/submitPrivate', multer(), indexController.submitPrivate);

var server = app.listen(6503, function() {
	console.log('Express server listening on port ' + server.address().port);
});