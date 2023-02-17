var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "test",
    multipleStatements: true,
    debug: false,
    connectionLimit: 1,
    queueLimit: 0,
    waitForConnection: true
});


connection.connect(function (err) {
    if (err) { console.log('DB Connection Failed'); }
    else { //throw err;
        console.log('MySQL DB Connection Succeed')
    }
});

module.exports = connection;