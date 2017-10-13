var orm = require('../config/orm.js');

var diagnoser = {
	addUser : function(userData, cbFunc){
		orm.insertUser(userData, (res)=>{
			cbFunc(res);
		});
	}
}
module.exports = diagnoser;