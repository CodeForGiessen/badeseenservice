(function() {
    'use strict';

    var async = require('async'),
        express = require('express'),
        exphbs = require('express-handlebars'),
        path = require('path'),
        Lake = require('../models/lake').Lake;

    var app = module.exports = express();

    /* Handlebars Layouts */
    var hbs = exphbs.create({
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/views');

    /* static stuff like css, js with static middleware */
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));

    /* Routes */
    app.get('/', function(req, res, next) {
        async.series(
            [
                function(callback) {
                    // get system stats
                    var usage = require('usage');
                    var pid = process.pid;
                    usage.lookup(pid, callback);
                },
                function(callback) {
                    Lake.count({}, callback);
                }
            ],
            function(err, results) {
                if (err) {
                    res.render('error', {
                        error: err
                    });
                    next(err);
                }

                res.render('home', {
                    title: 'Badeseen API Dashboard',
                    sys_stats: err ? {} : results[0],
                    lake_count: results[1] ? results[1] : 0,
                    helpers: {
                        bytesToMegabytes: function(bytes) {
                            return (bytes % 10000) / 100;
                        }
                    }
                });
            }
        );
    });

    app.get('/lakes', function(req, res, next) {
        Lake.find({}, function(err, docs) {
            if (err) {
                res.render('error', {
                    error: err
                });
                next(err);
            }

            res.render('lakes', {
                lakes: docs,
                lake_count: docs.length
            });
        });
    });

    app.get('/lakes/:id', function(req, res, next) {
        if (!req.params.id) res.redirect('/lakes');

        async.parallel(
            [
                function(callback) {
                    Lake.findOne({
                        _id: req.params.id
                    }, callback);
                },
                function(callback) {
                    Lake.count({}, callback);
                }
            ],
            function(err, results) {
                if (err) {
                    res.render('error', {
                        error: err
                    });
                    next(err);
                }

                res.render('lake', {
                    lake: results[0].toObject(),
                    lake_count: results[1]
                });
            }
        );
    });

    app.use(function(req, res, next) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('error', {
                title: "404 - Not found",
                error: "Not found: '" + req.url + "'.",
                error_num: 404
            });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found: ' + req.url);
    });

    app.use(function(err, req, res, next) {
        // we may use properties of the error object
        // here and next(err) appropriately, or if
        // we possibly recovered from the error, simply next().
        res.status(err.status || 500);
        res.render('error', {
            error: err,
            error_num: 500
        });
    });
})();