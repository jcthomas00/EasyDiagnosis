var connection = require("./connection.js");

var orm = {
	getAllSymptoms : function(cbFunc){
		let sql = "SELECT * FROM symptoms";
		connection.query(sql, cbFunc, (err, res)=>{
			cbFunc(res);
		});
	},
	getUser : function(username, cbFunc){
		let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
		connection.query(sql, username, (err, res)=>{
			cbFunc(res);
		})
	},
	getUserDiagnoses : function(userId, cbFunc){
		let sql = "SELECT diagnosis.condition_name, requests.time, requests.search_text," + 
			"requests.request_id FROM users LEFT JOIN requests on users.user_id=" +
			"requests.fk_user_id LEFT JOIN diagnosis ON requests.request_id= "+
			"diagnosis.fk_request_id WHERE users.user_id = ? ORDER BY time DESC";
		connection.query(sql, userId, (err, res)=>{
			if(err){
				console.log(err)
			}else{
				cbFunc(res);				
			}
		});
	},
	validPassword : function(password, curUser) {
		if(curUser){
			return (password === curUser[0].password);			
		}
		throw error;
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
	deleteRequest : function (requestId){
		console.log("requestID: "+requestId);
		let sql = "DELETE FROM requests WHERE request_id = ?";
		connection.query(sql, requestId, (error, results, fields)=>{
			if (error){
				console.log(error);
				throw error;
			}
		});		
	},
	insertSymptoms : function (requestData){
		let sql = "INSERT INTO symptoms (fk_request_id, sID, symptom_name) VALUES (?, ?, ?)"
		for (symptom of requestData.symptoms){
			connection.query(sql, [requestData.request_id, symptom.id, symptom.common_name], (err, res)=>{
				if(err){
					console.log(err);
					throw(err);
				}else{
//					console.log(`Iserted ${symptom} into symptoms`);
				}
			});
		}
	},
	insertDiagnosis : function (requestData){
		let sql = "INSERT INTO diagnosis (fk_request_id, condition_id, condition_name) VALUES (?, ?, ?)"
		connection.query(sql, [requestData.request_id, requestData.condition_id, requestData.common_name], (err, res)=>{
			if(err){
				console.log(err);
				throw(err);
			}else{
//				console.log(`Iserted ${requestData.condition_id} into diagnosis`);
			}
		});
	}
};

module.exports = orm;