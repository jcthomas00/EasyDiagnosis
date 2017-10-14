var mysql = require('mysql');

if (process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
	var connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'madonna',
	    database: 'diagnoser'
	});
}
// var connection = mysql.createConnection(`mysql://root:madonna@localhost:3306/diagnoser`);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;