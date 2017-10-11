var express = require('express');
var router = express.Router();
var symptoms = require('../models/symptoms.js');

router.get('/', function(req,res) {
	res.redirect('/symptoms')
});

router.get('/:symptoms', function(req,res) {
	surger.all(function(data){
		var hbsObject = {burgers : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});


router.post('/symptoms/create', function(req,res) {
	burger.create(['name', 'devoured'], [req.body.name, req.body.devoured], function(data){
		res.redirect('/burger')
	});
});

router.put('/symptoms/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/symptoms');
	});
});

module.exports = router;