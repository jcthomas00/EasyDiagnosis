var express = require('express');
var router = express.Router();
var symptoms = require('../models/symptoms.js');
var request = require("request");

//show index page
router.get('/', function(req, res) {
		res.render('index', "");
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
				diagnosis:firstDiagnosis.common_name
			});	//res.render
		});		//getDiagnosis
	});			//getSymptoms
});				//post

//function to get diagnosis based on an array of symptoms
var getDiagnosis = (symptoms, cbFunc, gender="male", old=30)=>{
	var symp = [];
	for (symptom of symptoms){
		symp.push({ id: symptom.id, choice_id: symptom.choice_id });
	}
	var options = {
		url		: "https://api.infermedica.com/v2/diagnosis",
		method	: "POST",
		headers	: {
			"app-id"		: "de7ec279",
			"app-key"		: "05e5b6142f5e332375904a0a7e4b6865",
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
						"app-id"		: "de7ec279",
						"app-key"		: "05e5b6142f5e332375904a0a7e4b6865",
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