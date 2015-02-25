/**
 * Removes all Lakes out of the lake collection
 *
 * @param {Function} callback       function to call with `err` on completion or
 *                                  error
 */
function emptyCollection(callback) {
    var Lake = require('../models/lake').Lake;

    Lake.find({}).remove(callback);
}

/**
 * Import lake datasets as Lake
 *qq
 * @param {Object}      rows        datasets
 * @param {Function}    callback    function to call with `err` after completion
 *                                  or on error
 */
function importLakes(rows, callback) {
    var Lake = require('../models/lake').Lake,
        async = require('async');

    var functions = [];

    rows.map(function(row) {
        functions.push((function(row) {
            return function(callbackFn) {
                Lake.update({
                    _id: row._id
                }, row, {
                    upsert: true
                }, callbackFn);
            };
        })(row));
    });

    async.parallel(functions, callback);
}

/**
 * Import JSON file to mongodb collection
 *
 * @param {String}  file            file to path with data to import (see `Lake` model for reference)
 * @param {Boolean} remove          whether or not to empty the collection before
 *                                  inserting new objects
 * @param {Function} callback       function to call with `err` on completion or
 *                                  error
 */
function fromJSON(filePath, remove, callback) {
    var lake = require('../models/lake'),
        fs = require('fs');

    // try to open file
    try {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                callback(err);
                return;
            }

            data = JSON.parse(data);

            if (remove) {
                emptyCollection(function(err) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    importLakes(data, callback);
                });
            } else {
                importLakes(data, callback);
            }
        });
    } catch (err) {
        callback(err);
    }
}

module.exports.emptyCollection = emptyCollection;
module.exports.importLakes = importLakes;
module.exports.fromJSON = fromJSON;
