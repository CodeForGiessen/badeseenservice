#!/usr/local/bin/node

'use strict';
var fs = require('fs'),
    program = require('commander'),
    colors = require('colors'),
    q = require('q');


program
    .version('0.0.1')
    .description('import scraped data into mongodb to feed the api some data')
    .option('-f --file <file>', 'file in json format with data to import')
    .option('-d --database <database>', 'mongodb path')
    .option('-c --collection [collection]', 'name of collection to store data in (default `badeseen`)')
    .option('-r --remove', 'Remove / cleanup collection before insert new lakes')
    .parse(process.argv);

function showIncorrectFileError() {
    console.log('Error:'.underline.red + ' Please provide a correct file path!');
}

// set default path
program.database = program.database || 'localhost:27017';
program.collection = program.collection || 'badeseen';
program.remove = program.remove || false;

function saveToMongoDB(data) {
    var mongoose = require('mongoose'),
        lake = require('../models/lake');
    require('mongoose-q')(mongoose);
    var Lake = lake.Lake;
    mongoose.connect(program.database);

    var promise = q();

    promise.then(function() {
            if (program.remove) {
                return Lake.find({}).removeQ();
            }
        })
        .then(function() {
            return q.all(data.map(function(row) {
                return Lake.updateQ({
                    _id: row._id
                }, row, {
                    upsert: true
                });
            }));
        })
        .catch(function(err) {
            console.log('Error:'.underline.red + ' ' + err);
        })
        .finally(function() {
            mongoose.connection.close();
        });
}

try {
    fs.readFile(program.file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: '.underline.red + err);
            return;
        }

        data = JSON.parse(data);

        saveToMongoDB(data);
    });
} catch (e) {
    showIncorrectFileError();
}
