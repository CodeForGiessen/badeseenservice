(function() {
    'use strict';

    /* global require */
    var fs = require('fs'),
        express = require('express'),
        path = require('path'),
        mongoose = require('mongoose');

    var app = exports.app = express();

    /* set up middleware */
    var api = require('./api'),
        trigger = require('./trigger'),
        dashboard = require('./dashboard');

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(api);
    app.use(trigger);

    /* serve documentation as static content */
    app.use('/doc', express.static(__dirname + '/doc'));
    app.use(dashboard);


    /* Mongoose */
    /* Establish database connection: either use the specified `DB_URI=ADRESS_TO_MONGODB`
    via the environment, or fall back to the default path */
    var database = process.env.MONGODB_URI || 'localhost:27017/badeseen';
    mongoose.connect(database);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to database');
    });

    mongoose.connection.on('error', function(err) {
        console.log(err);
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
})();
