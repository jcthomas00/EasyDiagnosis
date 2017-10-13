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
//		console.log(`${password} : ${curUser[0].password}`);
		return (password === curUser[0].password);
	},
	getTrendingSymptoms : function(limit = 10, cbFunc){
		let sql = "SELECT symptom_id, COUNT(symptom_id) AS count FROM symptoms" +
					" LEFT JOIN requests GROUP BY symptom_id ORDER BY time LIMIT 10"
		connection.query(sql, cbFunc, (err, res)=>{
			if (error){
				console.log(error);
				throw error;
			}
			cbFunc(res);
		});
	},
	insertUser : function (userData, cbFunc){
		let sql = "INSERT INTO users (name, phone, email, gender, age, password)" +
					"VALUES (?, ?, ?, ?, ?, ?)"
		connection.query(sql, [userData.name, userData.phone, userData.email, userData.gender,
			userData.age, userData.password], (error, results, fields)=>{
				if (error){
					console.log(error);
					throw error;
				}
				cbFunc(results.insertId);
		});
	},
	insertRequest : function (requestData, cbFunc){
//		console.log(requestData.text + ", " + requestData.user_id);
		let sql = "INSERT INTO requests (fk_user_id, search_text, time) VALUES (?, ?, ?)";
		connection.query(sql, [requestData.user_id, requestData.text, Date.now()], (error, results, fields)=>{
			if (error){
				console.log(error);
				throw error;
			}
			if(cbFunc && (typeof cbFunc === "function")){
				cbFunc(results.insertId);				
			}
		});		
	},
	insertSymptoms : function (requestData){
		let sql = "INSERT INTO symptoms (fk_request_id, sID) VALUES (?, ?)"
		for (symptom of requestData.symptoms){
			connection.query(sql, [requestData.request_id, symptom.id], (err, res)=>{
				if(err){
					console.log(err);
					throw(err);
				}else{
					console.log(`Iserted ${symptom} into symptoms`);
				}
			});
		}
	},
	insertDiagnosis : function (requestData){
		let sql = "INSERT INTO diagnosis (fk_request_id, condition_id) VALUES (?, ?)"
		connection.query(sql, [requestData.request_id, requestData.condition_id], (err, res)=>{
			if(err){
				console.log(err);
				throw(err);
			}else{
				console.log(`Iserted ${requestData.condition_id} into diagnosis`);
			}
		});
	}
};

module.exports = orm;