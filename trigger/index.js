(function() {
    'use strict';

    var express = require('express');
    var app = express();
    var importTrigger = require('./import.js');
    var weatherTrigger = require('./weather.js');


    app.use(importTrigger);
    app.use(weatherTrigger);

    module.exports = app;
})();
