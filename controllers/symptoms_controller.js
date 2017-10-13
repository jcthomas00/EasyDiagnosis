var express 		= require('express'),
	router 			= express.Router(),
	diagnoser 		= require('../models/diagnoser.js'),
	request 		= require("request"),
	passport 		= require("../config/passport"),
	isAuthenticated = require("../config/middleware/isAuthenticated"),
	current_user_id = 0;

//show index page
router.get('/', function(req, res) {
		res.render('index', "");
});

//show new user page
router.get('/register', function(req, res) {
		res.render('register');
});

//create new user
router.post('/register', function(req, res) {
	userData = {
		name: req.body.first_name + " " + req.body.first_name, 
		phone: req.body.phone, 
		email: req.body.email, 
		gender: req.body.gender,
		age: req.body.age, 
		password: req.body.password
	}
	diagnoser.addUser(userData, (newlyCreatedId)=>{
		current_user_id = newlyCreatedId;
	});
});

//show login page
router.get("/login", function(req, res) {
	// If the user already has an account send them to the members page
	if (req.user) {
	  res.redirect("/member");
	}
	res.render("login");
});

//do login logic
router.post("/login", passport.authenticate("local"), function(req, res) {
    res.render("member");
});

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/member", isAuthenticated, function(req, res) {
    res.render("member");
  });

//show dignosis based on entered text
router.post('/', function(req, res) {
	var symps=[];
	getSymptoms(req.body.spokenSymptoms, (body)=>{
		symps = JSON.parse(body).mentions;
		getDiagnosis(symps, (body)=>{
			let firstDiagnosis = JSON.parse(body).conditions[0];
			res.render('index', {
				probability: Math.round(firstDiagnosis.probability*100), 
				diagnosis: firstDiagnosis.common_name
			});	//res.render
		});		//getDiagnosis
	});			//getSymptoms
});				//post

//function to get diagnosis based on an array of symptoms
var getDiagnosis = (symptoms, cbFunc, gender="male", old=30)=>{
			console.log(symptoms);

	var symp = [];
	for (symptom of symptoms){
		symp.push({ id: symptom.id, choice_id: symptom.choice_id });
	}
	var options = {
		url		: "https://api.infermedica.com/v2/diagnosis",
		method	: "POST",
		headers	: {
			"app-id"		: process.env.APP_ID,
			"app-key"		: process.env.APP_KEY,
			"content-type"	: "application/json"
		},
		body: 	JSON.stringify({
					sex: gender,
					age: old,
					evidence: symp
				})
	};
	request(options, (err, res, body)=>{
		if(err){
			console.log(err);
		} else{
			cbFunc(body);
		}
	});
}

//function to get symptoms based on inputted text
var getSymptoms = (text, cbFunc)=>{
	var options = {
		url		: 	"https://api.infermedica.com/v2/parse",
		method	: 	"POST",
		headers	: 	{
						"app-id"		: process.env.APP_ID,
						"app-key"		: process.env.APP_KEY,
						"content-type"	: "application/json"
					},
		body: 	JSON.stringify({text : text })
	};
	request(options, (err, res, body)=>{
		if(err){
			console.log(err);
		} else{
			cbFunc(body);
		}
	});
}

module.exports = router;