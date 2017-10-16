var connection = require("./connection.js");

var orm = {

	//send back everything from the `symptom` table
	getAllSymptoms : function(cbFunc){
		let sql = "SELECT * FROM symptoms";
		connection.query(sql, cbFunc, (err, res)=>{
			cbFunc(res);
		});
	},

	//send back symptoms that correspond to a given request
	getRequestSymptoms : function(requestId, cbFunc){
		let sql = "SELECT symptoms.symptom_name FROM requests LEFT JOIN symptoms " +
			"ON requests.request_id = symptoms.fk_request_id WHERE requests.request_id = ?";
		connection.query(sql, requestId, (err, res)=>{
			if(err){
				console.log(err)
			}else{
				cbFunc(res);				
			}
		});
	},

	//get user information for the given username and send it to callback func. 
	getUser : function(username, cbFunc){
		let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
		connection.query(sql, username, (err, res)=>{
			cbFunc(res);
		})
	},

	//get all of a given users' searches/requests and corresponding diagnosis 
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

	//check if the password is correct
	validPassword : function(password, curUser) {
		if(curUser){
			return (password === curUser[0].password);			
		}
		throw error;
	},

	//send back top 5 symptoms
	getTrendingSymptoms : function(cbFunc){
		let sql = "SELECT symptom_name as sName, AVG(time) as avgtime, COUNT(symptom_id) "+
			"AS count FROM symptoms LEFT JOIN requests on symptoms.fk_request_id = "+
			"requests.request_id GROUP BY symptom_name ORDER BY count DESC LIMIT 5";
		connection.query(sql, (error, res)=>{
			if (error){
				throw error;
			}
			cbFunc(res);
		});
	},

	//create a new user in the user table and send back the generated user_id
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

	//create a new request and send back the generated request_id
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

	//delete the given request
	deleteRequest : function (requestId){
		let sql = "DELETE FROM requests WHERE request_id = ?";
		connection.query(sql, requestId, (error, results, fields)=>{
			if (error){
				console.log(error);
				throw error;
			}
		});		
	},

	//create a new symptom
	insertSymptoms : function (requestData){
		let sql = "INSERT INTO symptoms (fk_request_id, sID, symptom_name) VALUES (?, ?, ?)"
		for (symptom of requestData.symptoms){
			connection.query(sql, [requestData.request_id, symptom.id, symptom.common_name], (err, res)=>{
				if(err){
					console.log(err);
					throw(err);
				}
			});
		}
	},

	//create a new diagnosis
	insertDiagnosis : function (requestData){
		let sql = "INSERT INTO diagnosis (fk_request_id, condition_id, condition_name) VALUES (?, ?, ?)"
		connection.query(sql, [requestData.request_id, requestData.condition_id, requestData.common_name], (err, res)=>{
			if(err){
				console.log(err);
				throw(err);
			}
		});
	}
};

//package this file for consumption my the model
module.exports = orm;