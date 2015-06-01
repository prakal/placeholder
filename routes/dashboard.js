var express = require('express');
var router = express.Router();
var qs = require('querystring');
var request = require('request');
var path = require('path');
var passport     = require('passport');
var Student = require('../app/models/student');
var db = require('../app/config');
var dbQueries = require('../utils/dbQueries.js')


router.get('/classes-fetch', function(req, res, next) {
	console.log(req.session.user);
	
	dbQueries.getClassOfStudentUsing('students.username',req.session.user, function(data){
		console.log(data);
		res.json(data);
	});

});
/* GET home page. */
router.get('/*', function(req, res, next) {
	// res.sendFile(path.join(__dirname,'../public/app/dashboard/dashboard.html'));
	console.log('im here',req.url.slice(1));
	dbQueries.getClassUsing('classes.id',req.url.slice(1),function(data){
		console.log('instructor_id of class',data.instructor_id,typeof data.instructor_id);
		db.knex("instrVideos")
			.select("videoURL")
			.where({'instructor_id':data.instructor_id, 'class_id':req.url.slice(1)})
			.then(function(resp){
				console.log('resp',resp);
				res.json(resp);
			});
		// db.knex.raw('select '+"'videoURL'"+ 'from "instrVideos" where instructor_id = '+data.instructor_id)
		// 	.then(function(resp){
		// 		console.log('resp',resp);
		// 		res.json(resp);
		// 	});
		// dbQueries.getInstVideoUsing('instrVideos.instructor_id',data.instructor_id,function(data){
		// 	console.log('instrVideo',data);
		// 	res.json(data);
		// })
	});
});

module.exports = router;
