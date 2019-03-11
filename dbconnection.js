var mysql = require('mysql');

// var connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'muflar'
// });

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'india@1234',
    database: 'demo'
});

module.exports = connection;
