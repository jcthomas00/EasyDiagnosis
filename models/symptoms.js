var orm = require('../config/orm.js');

var burger = {
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

module.exports = symptoms;