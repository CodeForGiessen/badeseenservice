(function() {
    'use strict';
    var parser = require('xml2json');
    var Lake = require('../models/lake').Lake;
    var q = require('q');
    var request = require('request');
    var mongoose = require('mongoose');

    function requestQ(url) {
        var deferred = q.defer();
        request(url, function(error, response, html) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(html);
            }
        });
        return deferred.promise;
    }

    function getLakeMappingQ() {
        return q.ninvoke(Lake, 'find', {}, {
                _id: 1,
                hlugid: 1
            })
            .then(function(lakes) {
                var mapping = {};
                lakes.forEach(function(lake) {
                    mapping[lake.hlugid] = lake.id;
                });
                return mapping;
            });
    }

    /**
     * Imports the badeseendata from the hlugserver
     * @return {Promise} QPromise. Success will return a object with
     *           {
     *               deleted: Deleted lakes
     *               created: Created lakes
     *               updated: Updated lakes
     *           }
     */
    function importQ() {
        var mapping;
        var lakeDelete = [];
        var upsertedBind;
        return getLakeMappingQ()
            .then(function(m) {
                mapping = m;
                return requestQ(process.env.HLUGEXPORT_URI);
            })
            .then(function(content) {
                content = content.replace(/&ltlt;/gi, '&lt;');
                var input = parser.toJson(content, {
                    object: true,
                    coerce: false
                });

                var lakes = convertFromHLUGJSONtoJSON(input, mapping);
                lakeDelete = Object.keys(mapping).map(function(hlugid) {
                    return mapping[hlugid];
                });
                var lakeIds = lakes.map(function(lake) {
                    return lake._id.toString();
                });

                lakeDelete = lakeDelete.filter(function(id) {
                    return lakeIds.indexOf(id.toString()) === -1;
                });

                return q.all(lakes.map(function(lake) {
                        return q.ninvoke(Lake, 'update', {
                            _id: lake._id
                        }, lake, {
                            upsert: true
                        });
                    }))
                    .then(function(upserted) {
                        upsertedBind = upserted;
                        return q.all(lakeDelete.map(function(lakeId) {
                            return q.ninvoke(Lake, 'remove', {
                                _id: lakeId
                            });
                        }));
                    });

            })
            .then(function(d){
                var updated = 0;
                var created = 0;
                upsertedBind.forEach(function(entry){
                    if(entry[1].updatedExisting){
                        updated++;
                    }else{
                        created++;
                    }
                });
                return {
                    deleted: d.length,
                    created: created,
                    updated: updated
                };
            });
    }

    /**
     * Converts the the XML Input (as JSON) to usable JSON.
     *
     * An idmapping from HLUGID to MongoDBId is needed.
     *
     * @param {Object} input     The inputjson
     * @param {Object} idMapping The mappingobject. If undefined Ids will be created
     * @return {Array} An array with lakes
     */
    function convertFromHLUGJSONtoJSON(input, idMapping) {
        var result = input.lakeImport.lake;
        result = result.map(function(lake) {
            //rename keys
            var renameMapping = {
                'activity': 'extracurricularActivity',
                'measurement': 'measurements',
                'message': 'messages',
                'yearrating': 'yearratings',
                'ressources': 'downloads',
                'id': 'hlugid',
                'authority': 'appropriateAuthority',
                'image': 'images',
                'seasonStart': 'openFrom',
                'seasonEnd': 'openTo',
                'depthAverage': 'depthAvg',
                'introText': 'introtext'
            };
            renameKeys(lake, renameMapping);

            //set mongoid
            if (idMapping) {
                var oldId = idMapping[lake.hlugid];
                if (oldId) {
                    lake._id = oldId;
                } else {
                    //new lake generate new id
                    lake._id = mongoose.Types.ObjectId();
                }
            } else {
                lake._id = mongoose.Types.ObjectId();
            }

            //parseNumbers of lake
            parseToNumber(lake, ['heightAboveSeaLevel', 'areaHa', 'depthMax', 'depthAvg']);

            //parseDates openTo openFrom of lake
            lake.openTo = new Date(lake.openTo);
            lake.openFrom = new Date(lake.openFrom);

            //correct yearratings

            lake.yearratings = lake.yearratings || [];
            if (Object.prototype.toString.call(lake.yearratings) !== '[object Array]') {
                lake.yearratings = [lake.yearratings];
            }
            lake.yearratings.forEach(function(rating) {
                parseToNumber(rating, ['rating']);
                if (rating.rating >= 7) {
                    rating.rating = 0;
                }
            });

            lake.measurements = lake.measurements || [];
            if (Object.prototype.toString.call(lake.measurements) !== '[object Array]') {
                lake.measurements = [lake.measurements];
            }

            //correct measurements
            var measurementMapping = {
                'escherichiaoli': 'escherichiaColi'
            };
            lake.measurements.forEach(function(measurement) {
                renameKeys(lake, measurementMapping);
                parseToNumber(measurement, ['waterTemperature', 'rating']);
                if (measurement.waterTemperature === 0) {
                    measurement.waterTemperature = null;
                }
                measurement.date = new Date(measurement.date);
                measurement.comment = fixEncodingErrorsComment(filterMeasurementComment(measurement.comment));
            });

            //fix operator
            lake.operator.zipcodeCity = lake.operator.zipcode + ' ' + lake.operator.city;
            delete lake.operator.city;
            delete lake.operator.zipcode;
            lake.operator.telephone = filterTelephoneNumber(lake.operator.telephone);
            lake.operator.fax = filterTelephoneNumber(lake.operator.fax);

            //fix appropriateAuthority
            lake.appropriateAuthority.zipcodeCity = lake.appropriateAuthority.zipcode + ' ' + lake.appropriateAuthority.city;
            delete lake.appropriateAuthority.city;
            delete lake.appropriateAuthority.zipcode;
            lake.appropriateAuthority.telephone = filterTelephoneNumber(lake.appropriateAuthority.telephone);
            lake.appropriateAuthority.fax = filterTelephoneNumber(lake.appropriateAuthority.fax);

            //fix downloads
            var downloadsMapping = {
                'bathymetricChartUrl': 'bathymetricChart',
                'generalInformationUrl': 'generalInformation',
                'landUsePlanUrl': 'landUseMap'
            };

            renameKeys(lake.downloads, downloadsMapping);

            //fixmessages
            lake.messages = lake.messages || [];
            if (Object.prototype.toString.call(lake.messages) !== '[object Array]') {
                lake.messages = [lake.messages];
            }
            lake.messages.forEach(function(message) {
                message.date = new Date(message.date);
            });

            if(lake.introtext.length === 0){
                lake.introtext = 'Für diesen Badesee liegt leider noch keine Beschreibung vor.';
            }
            //strip html tags
            lake.introtext = lake.introtext.replace(/<[^>]*>/g,'');

            //rename url to src in image
            lake.images = lake.images || [];
            if (Object.prototype.toString.call(lake.images) !== '[object Array]') {
                lake.images = [lake.images];
            }
            var imagesMapping = {
                'url': 'src'
            };

            lake.images.forEach(function(img){
                renameKeys(img, imagesMapping);
            });

            return sortKeys(lake);
        });


        return result;
    }

    function filterMeasurementComment(comment) {
        var filterComments = [
            /^o\.?b\.?$/i,
            /^(keine|keien) Auff.ll?ig?keiten$/i,
            /^keine$/i,
            /^ohne Beanstandung$/i,
            /^o\.?$/i,
            /^-$/i,
            /^Sichtkontrolle: Keine Auff(.)lligkeiten$/i
        ];
        var result = comment.trim();

        filterComments.forEach(function(regex) {
            if (regex.test(result)) {
                result = '';
            }
        });
        return result;
    }

    function filterTelephoneNumber(rawTelephone) {
        var filterComments = [
            /---/i,
            /---/i
        ];
        var result = rawTelephone.trim();

        filterComments.forEach(function(regex) {
            if (regex.test(result)) {
                result = '';
            }
        });
        return result;
    }


    function fixEncodingErrorsComment(comment) {
        var result = comment;
        result = result.replace(/Zus\?tzliche/g, 'Zusätzliche');
        result = result.replace(/zur\?ckgegangen/g, 'zurückgegangen');
        result = result.replace(/schw\?l/g, 'schwül');
        result = result.replace(/Algenbl\?te/g, 'Algenblüte');
        result = result.replace(/hei\?es/g, 'heißes');
        result = result.replace(/unbest\?ndiges/g, 'unbeständiges');
        result = result.replace(/Niederschl\?ge/g, 'Niederschläge');
        result = result.replace(/w\?hrend/g, 'während');
        return result;
    }


    /**
     * Renames the key of an object
     * @param {Object} obj
     * @param {Object} mapping An object with mapping from old -> new
     * @return {Object} The same object
     */
    function renameKeys(obj, mapping) {
        Object.keys(mapping).forEach(function(oldKey) {
            var newKey = mapping[oldKey];
            if (typeof obj[oldKey] !== 'undefined') {
                obj[newKey] = obj[oldKey];
                delete obj[oldKey];
            }
        });
        return obj;
    }

    /**
     * Parses the attributes of an object to numbers
     * Not parseable attributes will be set to null. Wrong mapping will be ignored
     *
     * @param {Object} obj
     * @param {Array} keys Array of keys of which the attributes should be parses to numbers
     * @return {Object} Same as obj
     */
    function parseToNumber(obj, keys) {

        keys.forEach(function(key) {
            var value = obj[key];
            if (typeof value !== 'undefined') {
                try {
                    value = Number(value);
                } catch (e) {
                    value = null;
                }
                obj[key] = value;
            }
        });

        return obj;
    }

    /**
     * CREATES a NEW object with sorted keys.
     *
     * @param {Object} obj Object with unsorted keys
     * @return {Object} NEW OBJECT with sorted keys
     */
    function sortKeys(obj) {
        var result = {};
        var keys = Object.keys(obj);
        keys.sort();
        keys.forEach(function(key) {
            result[key] = obj[key];
        });

        return result;
    }
    exports.importQ = importQ;

})();
