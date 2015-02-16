var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lakeSchema = new Schema({
    id: Number,
    name: String,
    hlugurl: String,
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
    measurements: Array,
    extracurricularActivity: String,
    yearratings: Array,
    images: Array,
    extracurricularActivity: Array,
    operator: {
        name: String,
        street: String,
        zipcodeCity: String,
        email: String,
        telephone: String,
        fax: String,
        website: String
    },
    appropriateAuthority: {
        name: String,
        address: String,
        addressAdditional: String,
        street: String,
        zipcodeCity: String,
        telephone: String
    }
});

module.exports.lakeSchema = lakeSchema;
