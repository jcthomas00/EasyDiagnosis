var connection = require("./connection.js");

var orm = {
	getAllSymptoms : function(cbFunc){
		let sql = "SELECT * FROM symptoms";
		connection.query(sql, cbFunc, (err, res)=>{
			console.log(res);
			cbFunc(res);
		});
	},
	getUser : function(username, cbFunc){
		let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
		connection.query(sql, username, (err, res)=>{
			cbFunc(res);
		})
	},
	validPassword : function(password, curUser) {
		console.log(`${password} : ${curUser[0].password}`);
		return (password === curUser[0].password);
	},
	getTrendingSymptoms : function(limit = 10, cbFunc){
		let sql = "SELECT symptom_id, COUNT(symptom_id) AS count FROM symptoms" +
					" LEFT JOIN requests GROUP BY symptom_id ORDER BY time LIMIT 10"
		connection.query(sql, cbFunc, (err, res)=>{
			cbFunc(res);
		});
	},
	insertUser : function (userData, cbFunc){
		let sql = "INSERT INTO users (name, phone, email, gender, age, password)" +
					"VALUES (?, ?, ?, ?, ?, ?)"
		connection.query(sql, [userData.name, userData.phone, userData.email, userData.gender,
			userData.age, userData.password], (error, results, fields)=>{
				cbFunc(results.insertId);
		});
	},
	insertRequest : function (requestData, cbFunc){
		let sql = "INSERT INTO requests (fk_user_id, text, time) VALUES (?, ?)"
		connection.query(sql, [requestData.user_id, requestData.text], Date.now(), (err, res)=>{
			cbFunc(res);
		});		
	},
	insertSymptom : function (requestData, cbFunc){
		let sql = "INSERT INTO symptoms (fk_request_id, sID) VALUES (?)"
		connection.query(sql, [requestData.query_id, requestData.symptom_id], (err, res)=>{
				cbFunc(res);
			});
	},
	insertDiagnosis : function (requestData, cbFunc){
		let sql = "INSERT INTO diagnosis (fk_request_id, condition_id) VALUES (?)"
		connection.query(sql, [requestData.query_id, requestData.condition_id], (err, res)=>{
				cbFunc(res);
			});
	}
};

module.exports = orm;