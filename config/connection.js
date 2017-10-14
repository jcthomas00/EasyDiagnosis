var mysql = require('mysql');

var connection = "";
if (process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
	connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'madonna',
	    database: 'diagnoser'
	});
}

connection.connect(function(err) {
console.log("I'm here");
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;