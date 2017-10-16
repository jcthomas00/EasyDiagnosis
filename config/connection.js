var mysql = require('mysql');

var connection = "";

//use Jaws DB if on Heoku
if (process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
//change these settings if running locally
	connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '*****',
	    database: 'diagnoser'
	});
}

//try to connect with DB and crash if we cant connect
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//package the connection for consumption by ORM
module.exports = connection;