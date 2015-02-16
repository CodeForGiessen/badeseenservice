#!/usr/local/bin/node

var fs = require('fs'),
    program = require('commander'),
		colors = require('colors');

program
    .version('0.0.1')
		.description('import scraped data into mongodb to feed the api some data')
    .option('-f --file <file>', 'file in json format with data to import')
    .option('-d --database <database>', 'mongodb path')
		.option('-c --collection [collection]', 'name of collection to store data in (default `badeseen`)')
    .parse(process.argv);

function showIncorrectFileError() {
	console.log('Error:'.underline.red + ' Please provide a correct file path!');
}

// set default path
program.database = program.database || 'localhost:27017';
program.collection = program.collection || 'badeseen';

function saveToMongoDB(data) {
	var mongoose = require('mongoose'),
			lake = require('../models/lake');
	
	var Lake = lake.Lake;
	mongoose.connect(program.database);

	data.forEach(function(row) {
		var lake = new Lake(row);
		lake.save(function(err) {
			if (err) {
				console.log('Error:'.underline.red + ' ' + err);
				mongoose.connection.close();
				return;
			}
			// saved!
		});
	});
	mongoose.connection.close();	
}

try {
	fs.readFile(program.file, 'utf8', function (err, data) {
	  if (err) {
	    console.log('Error: '.underline.red + err);
	    return;
	  }

	  data = JSON.parse(data);

		saveToMongoDB(data);
	});
} catch(e) {
	showIncorrectFileError();
}
