(function() {
    'use strict';

    /* global require */
    var Lake = require('../../../models/lake').Lake;

    /**
     * Check whether the given id is a valid mongodb id or not
     * @param id the id to check

     * @param {bool} is valid id or not
    */
    function isObjectId(id) {
        return Lake.ObjectId.isValid(id);
    }

    function getAllObjectIDs(callback) {
        Lake.find({}, {
            '_id': 1
        }, function(err, doc) {
            var ids = [];

            if (!err) {
                doc.forEach(function(elt, index) {
                    ids.push(elt._id);
                });
            }

            callback(err, ids);
        });
    }

    /**
     * Create a lake based on the `lakeScheme` and call callback
     *
     * @param {Object} lake to save
     * @param {Function} callback
     */
    function createLake(lake, callback) {
        var newLake = new Lake(lake);
        newLake.save(callback);
    }


    /**
     * Get lake from database and call callback
     *
     * @param  {Object}   query    Query
     * @param  {Function} callback Function to call after execution
     */
    function retrieveLake(query, callback) {
        Lake.findOne(query, callback);
    }

    /**
     * Get lake basedata (without subresources) from database and call callback
     *
     * @param  {Object}   query    Query
     * @param  {Function} callback Function to call after execution
     */
    function retrieveLakeBaseData(query, callback) {
        Lake.findOne(query, {
            measurements: 0,
            messages: 0
        }, callback);
    }

    /**
     * Update lake data matching the query with the new
     * data and call callback
     *
     * @param  {Object}   query    Query to find lake
     * @param  {Object}   newData  New data
     * @param  {Function} callback Function to call after execution
     */
    function updateLake(query, newData, callback) {
        Lake.findOneAndUpdate(query, newData, callback);
    }

    /**¬
     * Remove lake with given query and call callbacky
     *
     * @param  {Object}   query    Query to find lake
     * @param  {Function} callback Function to call after execution
     */
    function deleteLake(query, callback) {
        Lake.findOneAndRemove(query, callback);
    }

    module.exports.createLake = createLake;
    module.exports.retrieveLake = retrieveLake;
    module.exports.retrieveLakeBaseData = retrieveLakeBaseData;
    module.exports.updateLake = updateLake;
    module.exports.deleteLake = deleteLake;
    module.exports.isObjectId = isObjectId;
    module.exports.getAllObjectIDs = getAllObjectIDs;
})();
