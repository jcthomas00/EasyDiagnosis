<<<<<<< HEAD
var Sequelize = require('sequelize');
var model = require('../config/connection.js');
var symptoms = model.define('burger', {
    id: {
        type: Sequelize.STRING,
    },
    sym_name: {
    	type: Sequelize.STRING,
    }
});
=======
var orm; //= require('../config/orm.js');

var symptoms = {
	all: function(cb) {
		orm.all('burger', function(res){
			cb(res);
		});
	},
	create: function(cols, vals, cb) {
		orm.create('burger', cols, vals, function(res){
			cb(res);
		});
	},
	update: function(objColVals, condition, cb) {
		orm.update('burger', objColVals, condition, function(res){
			cb(res);
		});
	}
};

>>>>>>> 10f45d199420ab44c4da247b570db4f5e7bdd3c8
module.exports = symptoms;