var express 		= require('express'),
	router 			= express.Router(),
	diagnoser 		= require('../models/diagnoser.js'),
	request 		= require("request"),
	passport 		= require("../config/passport"),
	isAuthenticated = require("../config/middleware/isAuthenticated"),
	current_user_id = 1;

//show index page
router.get('/', function(req, res) {
	if (req.user) {
		console.log(req.user[0].age)
		let userFemale = (req.user[0].gender === "female") ? true : false;
		res.render('index', {userAge : req.user[0].age, userFemale : userFemale});
	}else{
		res.render('index', "");
	}
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
		res.render('/login')
	});
});

//show login page
router.get("/login", function(req, res) {
	// If the user already has an account send them to the members page
	if (req.user) {
	  res.redirect("/member");
	}else{
		res.render("login");
	}
});

//do login logic
router.post("/login", passport.authenticate("local", 
	{ successRedirect: '/member', failureRedirect: '/login' }), function(req, res) {
    res.render("member");
});

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/member", isAuthenticated, function(req, res) {
    res.render("member");
  });

//show dignosis based on entered text
router.post('/', function(req, res) {
	let symps 	= [], 
		reqData	= {
			user_id : (req.user ? req.user[0].user_id : 1), 
			text 	: req.body.spokenSymptoms
		};
	diagnoser.addRequest(reqData, (response)=>{
		reqData.request_id = response;
	});
	getSymptoms(req.body.spokenSymptoms, (body)=>{
		symps = JSON.parse(body).mentions;
		if (symps.length > 0){
			reqData.symptoms = symps;
			diagnoser.addSymptoms(reqData);			
			getDiagnosis(symps, req.body.gender, parseInt(req.body.age), (body)=>{
					let firstDiagnosis = JSON.parse(body).conditions[0];
					reqData.condition_id = firstDiagnosis.id;
					diagnoser.addDiagnosis(reqData);			

					res.render('index', {
						probability: Math.round(firstDiagnosis.probability*100), 
						diagnosis: firstDiagnosis.common_name
					});	//res.render
			});		//getDiagnosis
		} else {
			res.render('index', {noSymp : true});
		}	
	});			//getSymptoms
});				//post

//function to get diagnosis based on an array of symptoms
var getDiagnosis = (symptoms, gender="male", old=30, cbFunc)=>{

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