var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operatorSchema = new Schema({
		name: String,
    street: String,
    zipcodeCity: String,
    email: String,
    telephone: String,
    fax: String,
    website: String
});

var appropriateAuthoritySchema = new Schema({
    name: String,
    address: String,
    addressAdditional: String,
    street: String,
    zipcodeCity: String,
    telephone: String
});

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
    operator: [operatorSchema],
    appropriateAuthority: [appropriateAuthoritySchema]
});

var Lake = mongoose.model('Lake', lakeSchema);

module.exports.lakeSchema = lakeSchema;
module.exports.Lake = Lake;
