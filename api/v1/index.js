var express = require('express'),
    app = module.exports = express(),
    lakes = require('./lakes');

app.use(lakes);
/**
 * @api {get} / API entry point
 * @apiName GetRoot
 * @apiGroup API
 *
 * @apiSuccess (200) 200 OK
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_links":{
 *              "self":{
 *                  "href":"/"
 *              },
 *              "lakes":{
 *                  "href":"/lakes"
 *               }
 *          }
 *      }
 */
app.get('/api/v1/', function(req, res) {
    res.status = 200;
    res.send({
        '_links': {
            'self': {
                'href': '/'
            },
            'lakes': {
                'href': '/lakes'
            }
        }
    });
});
