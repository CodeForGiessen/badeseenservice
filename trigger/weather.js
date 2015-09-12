(function() {
    'use strict';

    /* global require */
    var express = require('express');
    var app =  express();
    var updateWeatherDataQ = require('./../lib').updateWeather.updateWeatherDataQ;

    app.get('/trigger/weather', function(req, res,next) {
        if(process.env.TRIGGER_PW && req.query.password && process.env.TRIGGER_PW === req.query.password){
            var startMs = new Date().getTime();
            var result = {
                success:true,
                err: null,
                time:0,
                lakesupdated:0,
                lakesupdatefailed:0
            };
            updateWeatherDataQ()
            .then(function(data){
                result.lakesupdated = data.updated;
                result.lakesupdatefailed = data.failed;
                result.time = new Date().getTime() - startMs;
                res.json(result);
            })
            .catch(function(err){
                result.success=false;
                result.err = err.toString() + ' ' + err.stack.toString();
                result.time = new Date().getTime() - startMs;
                res.status = 500;
                res.json(result);
            });
        }else{
            next();
        }
    });



    module.exports = app;
})();
