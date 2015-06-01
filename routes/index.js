var express = require('express');
var router = express.Router();
var qs = require('querystring');
var request = require('request');
var dbQueries = require('../utils/dbQueries');

router.post('/saveStudentURL', function(req, res, next) {
  console.log('gets to save saveStudentURL',req.body);
  dbQueries.getStudentUsing('username',req.body.username,function(data){
  	console.log('student id is', data);
  	// data.id is student_id
  	var vidInfo = {
  		'student_id': data.id,
  		'class_id': req.body.class_id,
  		'videoURL': req.body.videoURL
  	};
  	dbQueries.submitVid(vidInfo);
  })
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
