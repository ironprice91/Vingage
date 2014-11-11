// We need the amazon sdk module
var aws = require('aws-sdk');
var fs = require('fs');
var Video = require('../models/video.js');

var KEY, SECRET;
if(process.env.AWS_KEY){
  // if the process has AWS_KEY set, we'll use those values
  KEY = process.env.AWS_KEY;
  SECRET = process.env.AWS_SECRET;
} else {
  // if the process doesn't have stuff set, we'll load in our config file
  var privateSettings = require('../private.js');
  KEY = privateSettings.aws.key;
  SECRET = privateSettings.aws.secret;
}

var BUCKET = 'refactoru';

aws.config.update({
  accessKeyId: KEY,
  secretAccessKey: SECRET
});
var s3 = new aws.S3();

var indexController = {
  index: function(req, res) {
    Video.find({}, function (err, videos) {
      res.render('index', {
        bucket: BUCKET,
        user: req.user,
        videos: videos
      });
      console.log('HEY!!!', videos[0].title);
    });
  },

  view: function(req, res){
    s3.getObject({
      Bucket: BUCKET,
      Key: req.query.key
    }, function (err, data) {
      res.send(data.Body);
    });
  },
  // Add new Video method
  newVideo: function(req, res){
    // console.log('Your file info', req.files);

    var fName = req.files.video.name;
    var fPath = req.files.video.path;
    var cType = req.files.video.type;
    var size = req.files.video.size;
    fs.readFile(fPath, function (err, data) {
      console.log(err);
      s3.putObject({
        Bucket: BUCKET,
        Key: 'public/' + fName,
        ContentType: cType,
        ACL: 'public-read',
        Body: data
      }, function (err, result) {
        console.log(err, result);
        // good idea to remove the temporary upload
        fs.unlink(fPath);
        res.redirect('/');
      });
    });

    // Database for holding the AWS url to file 
    // Might have to do /public in your hard string url
      console.log('HEY MICHAEL: ', req.body.videoTitle);
      var newVideo = new Video({
      title: req.body.videoTitle,
      videoSrc: 'https://s3.amazonaws.com/refactoru/public/' + fName
      });
      newVideo.save(function(err, result){
        console.log('Result: ', result);
      });

  },

  focusVideo: function(req,res){
    var id = req.params.id;

    Video.findOne({_id: id}, function(err, result){
      console.log(result);
      res.render('focusVideo', result);
    });
  }
};

module.exports = indexController;
