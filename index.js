var fs = require('fs'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    config = require('config');

var dbConfig = config.get('Database.path') || 'localhost:27017/badeseen';
var app = exports.app = express();

/* set up API middleware */
var api = require('./api');
app.use(api);

/* serve documentation as static content */
app.use('/doc', express.static(__dirname + '/doc'));

/* Mongoose */
/* Establish database connection: either use the specified `DB_URI=ADRESS_TO_MONGODB`
via the environment, or fall back to the default path */
mongoose.connect(dbConfig);

/* Mongoose events */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbConfig);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose experienced error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

/* Mongoose disconnection on app termination */
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose is disconnecting due to app termination');
        process.exit(0);
    });
});

app.listen(7650);
