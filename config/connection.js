var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'an538811',
    database: 'burgers_db'
});
// var connection = mysql.createConnection(`mysql://root:madonna@localhost:3306/diagnoser`);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;