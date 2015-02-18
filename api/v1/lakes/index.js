var express = require('express'),
    app = module.exports = express(),
    crud = require('./crud');

/** @apiDefine LakeNotFoundError
 *
 * @apiError (404 Not Found) LakeNotFound The id of the Lake was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "LakeNotFound"
 *     }
 */

/**
 * @api {get} /lakes/ Lakes entry point
 * @apiName GetLakes
 * @apiGroup Lakes
 *
 * @apiSuccess (200) 200 OK
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_links":{
 *             '507f1f77bcf86cd799439011': '/lakes/507f1f77bcf86cd799439011'
 *          }
 *      }
 */
app.get('/api/v1/lakes', function(req, res) {
    res.status = 200;
    res.send({
        '_links': {
            // TODO
        }
    });
});
