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
	deleteRequest : function(requestId){
		orm.deleteRequest(requestId);
	},
	getRequestSymptoms : function(requestId, cbFunc){
		orm.getRequestSymptoms(requestId, (res)=>{
			cbFunc(res);
		});
	},
	getTrendingSymptoms : function(cbFunc){
		orm.getTrendingSymptoms((res)=>{
			cbFunc(res);
		});
	},
	getUserConditions : function(userId, cbFunc){
		orm.getUserDiagnoses(userId, (res)=>{
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