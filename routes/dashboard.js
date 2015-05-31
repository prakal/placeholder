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
	console.log('im here',req.url);
	
	res.json();
});

module.exports = router;
