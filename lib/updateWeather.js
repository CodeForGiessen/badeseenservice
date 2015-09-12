(function() {
    'use strict';
    var Lake = require('../models/lake').Lake;
    var request = require('request');
    var q = require('q');
    var async = require('async');


    function requestQ(requestObj) {
        var deferred = q.defer();
        request(requestObj, function(err, response, html) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve([response, html]);
            }
        });
        return deferred.promise;
    }

    /**
     * Like requestq but retries the request x times.
     * @param {Object} requestObj Requestobject or a string with the uri
     * @param {Number} r    Number of retires. Default: 5
     * @param {Number} d    Delay in ms when request will be executed. Default: 100
     * @return {QPromise}
     */
    function requestRetryQ(requestObj, r, d) {
        var delay = d || 100;
        var retries = r || 5;
        var deferred = q.defer();
        var tries = 0;
        var lastRequestPromise = q();
        var retry = function() {
            tries++;
            lastRequestPromise
                .delay(delay)
                .then(function() {
                    return requestQ(requestObj)
                        .spread(function(response, html) {
                            if ((response.statusCode >= 500 && response.statusCode < 600) || response.statusCode === 404 ) {
                                console.log(tries + ' retry due to ' + response.statusCode + ' error ' + requestObj.url);
                                if (tries >= retries) {
                                    throw 'too many retries';
                                } else {
                                    retry();
                                }
                            } else {
                                if(html.cod && html.cod.toString() === '404'){
                                    console.log(tries + ' retry due to lake not found error ' + requestObj.url);
                                    if (tries >= retries) {
                                        throw 'too many retries';
                                    } else {
                                        retry();
                                    }
                                }else{
                                    deferred.resolve([response, html]);
                                }
                            }
                        })
                        .catch(function(err) {
                            if (tries >= retries) {
                                deferred.reject('too many retries caused of: ' + err);
                            } else {
                                retry();
                            }
                        });
                });
        };
        retry();
        return deferred.promise;
    }
    var printOne = false;
    function getOpenWeatherMapUrl(city){
         var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + ',de&units=metric';
        if(process.env.OPENWEATHERMAPAPI_KEY){
            url+= '&APPID='+ process.env.OPENWEATHERMAPAPI_KEY;
        }else{
            console.warn('Please define OPENWEATHERMAPAPI_KEY! Using test / develop mode of api.  Api could reject requests');
        }
        return url;
    }

    function getWeatherQ(city){
        var url =  getOpenWeatherMapUrl(city);
        return requestRetryQ({
            url: url,
            json: true
        }, process.env.OPENWEATHERMAPAPI_RETRIES || 5, process.env.OPENWEATHERMAPAPI_DELAY || 100)
        .spread(function(response, html){
            return{
                openWeatherCityId: html.id,
                current: {
                    weather: html.weather,
                    temp: html.main.temp,
                    temp_min: html.main.temp_min,
                    temp_max: html.main.temp_max,
                    humidity: html.main.humidity,
                    pressure: html.main.pressure,
                    wind: html.wind,
                    clouds: html.clouds,
                    lastUpdated: new Date(html.dt * 1000)
                }
            };
        });
    }

    function updateWeatherDataQ(){
        var result = {
            updated: 0,
            failed: 0
        };
        return q.ninvoke(Lake, 'find', {}, {
                _id: 1,
                city: 1
            })
            .then(function(lakes) {
                return q.ninvoke(async,'eachLimit',lakes,1,function(lake,done){
                    getWeatherQ(lake.city)
                    .then(function(weather){
                        return q.ninvoke(Lake,'update',{
                            _id:lake._id
                        },{
                            weather:weather
                        });
                    })
                    .then(function(){
                        result.updated++;
                        done();
                    })
                    .catch(function(err){
                        console.log('update of lake(' + lake._id +') in city ' + lake.city + ' failed maybe next time');
                        result.failed++;
                        done();
                    });

                })
                .then(function(){
                    return result;
                });
            });
    }

    exports.updateWeatherDataQ = updateWeatherDataQ;
}());
