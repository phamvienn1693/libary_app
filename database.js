const mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	database : 'libary_app',
	user : 'admin93',
	password : ''
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;