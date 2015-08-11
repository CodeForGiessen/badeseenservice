(function() {
    'use strict';
    /**
     * This file holds the mongodb schema and the mongoose model for lakes.
     */

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var operator = {
        name: String,
        street: String,
        zipcodeCity: String,
        email: String,
        telephone: String,
        fax: String,
        website: String
    };

    var appropriateAuthority = {
        name: String,
        address: String,
        addressAdditional: String,
        street: String,
        zipcodeCity: String,
        telephone: String
    };

    var messages = {
        date: Date,
        message: String
    };

    var measurement = {
        date: Date,
        waterTemperature: {
            type: Number,
            default: null
        },
        enterocsocci: String,
        escherichiaColi: String,
        rating: Number,
        comment: String
    };

    var image = {
        src: String,
        copyright: String
    };

    var yearRating = {
        year: String,
        rating: Number
    };


    var downloads = {
        bathymetricChart: String,
        landUseMap: String,
        generalInformation: String
    };


    var weather = {
        openWeatherCityId: Number,
        current: {
            weather: [{
                id: Number,
                main: String,
                description: String,
                icon: String
            }],
            temp: String,
            temp_min: Number,
            temp_max: Number,
            humidity: Number,
            pressure: Number,
            wind: {
                speed: Number,
                deg: Number
            },
            clouds: {
                all: Number
            },
            lastUpdated: Date
        }
    };


    var lakeSchema = new Schema({
        name: String,
        hlugurl: String,
        hlugid: String,
        bathingPermission: String,
        latitude: Number,
        longitude: Number,
        openFrom: Date,
        openTo: Date,
        city: String,
        heightAboveSeaLevel: Number,
        areaHa: Number,
        depthMax: Number,
        depthAvg: Number,
        introtext: String,
        lakeType: String,
        measurements: [measurement],
        extracurricularActivity: Array,
        yearratings: [yearRating],
        images: [image],
        operator: operator,
        appropriateAuthority: appropriateAuthority,
        messages: [messages],
        downloads: downloads,
        weather: weather
    });

    var Lake = mongoose.model('Lake', lakeSchema);

    module.exports.lakeSchema = lakeSchema;
    module.exports.Lake = Lake;
}());
