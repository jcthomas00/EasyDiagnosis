var orm = require('../config/orm.js');

var diagnoser = {
	addUser : function(userData, cbFunc){
		orm.insertUser(userData, (res)=>{
			cbFunc(res);
		});
	},
	addRequest : function(userData, cbFunc){
		orm.insertRequest(userData, (res)=>{
			cbFunc(res);
		});
	},
	addSymptoms : function(userData){
		orm.insertSymptoms(userData);
	},
	addDiagnosis : function(userData){
		orm.insertDiagnosis(userData);
	}
}
module.exports = diagnoser;