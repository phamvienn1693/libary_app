var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('books', {title : 'Libary App'});

});

router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM books ";

		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}

    if(action == 'Add')
	{
		var id = request.body.id;

		var tittle = request.body.tittle;

		var status = request.body.status;

		var summary = request.body.summary;

        var available = request.body.available;

		var query = `
		INSERT INTO books 
		(id, tittle, status, summary, available) 
		VALUES ("${id}", "${tittle}", "${status}", "${summary}", "${available}")
		`;

		database.query(query, function(error, data){

			response.json({
				messstatus : 'Data Added'
			});
		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM books WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		var id = request.body.id;

		var tittle = request.body.tittle;

		var status = request.body.status;

		var summary = request.body.summary;

		var available = request.body.available;

		var query = `
		UPDATE books 
		SET tittle = "${tittle}", 
		status = "${status}", 
		summary = "${summary}", 
		available = "${available}" 
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

		var query = `DELETE FROM books WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}


});

module.exports = router;