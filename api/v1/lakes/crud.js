var Lake = require('../../../models/lake').Lake;

/**
 * Check whether the given id is a valid mongodb id or not
 * @param id the id to check

 * @param {bool} is valid id or not
*/
function isObjectId(id) {
    return Lake.ObjectId.isValid(id);
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
 * Update lake data
 *
 * @param  {Object}   query    Query to find lake
 * @param  {Object}   newData  New data
 * @param  {Function} callback Function to call after execution
 */
function updateLake(query, newData, callback) {
    Lake.findOneAndUpdate(query, newData, callback);
}

/**¬
 * Update lake with given quer and call callbacky
 *
 * @param  {Object}   query    [description]¬
 * @param  {Function} callback [description]¬
 */

function deleteLake(query, callback) {
    Lake.findOneAndRemove(query, callback);
}

module.exports.createLake = createLake;
module.exports.retrieveLake = retrieveLake;
module.exports.updateLake = updateLake;
module.exports.deleteLake = deleteLake;
