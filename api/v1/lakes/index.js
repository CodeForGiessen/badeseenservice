(function() {
    'use strict';

    /* global require */
    var express = require('express'),
        app = module.exports = express(),
        crud = require('./crud');

    /**
     * @apiDefine LakeNotFoundError
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
     * @api {get} /lakes API entry point for lakes ressources
     * @apiName GetLakes
     * @apiGroup Lakes
     *
     * @apiSuccess (200) 200 OK
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "self": {
     *              "href": "/api/v1/lakes"
     *          },
     *          "_links":{
     *              "507f1f77bcf86cd799439011": {
     *                  "href": "/api/v1/lakes/507f1f77bcf86cd799439011"
     *              }
     *          }
     *      }
     */
    app.get('/api/v1/lakes', function(req, res) {
        crud.getAllObjectIDs(function(err, ids) {
            res.status = 200;

            var out = {};
            out._links = [];

            ids.forEach(function(elt, index) {
                var obj = {};
                obj[elt] = {
                    href: '/api/v1/lakes/' + elt
                };
                out._links.push(obj);
            });

            out.self = {
                'href': '/api/v1/lakes'
            };

            res.json(out);
        });
    });

    /**
     * @api {get} /lakes/:id Get Lake
     * @apiName GetLake
     * @apiGroup Lakes
     *
     * @apiParam {String} id unique lake id
     *
     * @apiSuccess (200) {String} lake id
     * @apiSuccess (200) {String} name
     * @apiSuccess (200) {Object} appropriateAuthority responsible authority for the lake
     * @apiSuccess (200) {Number} areaHa size of the lake
     * @apiSuccess (200) {String} city nearby city
     * @apiSuccess (200) {Number} depthAvg average depth
     * @apiSuccess (200) {Number} depthMax maximal depth
     * @apiSuccess (200) {Array} extracurricularActivity activities
     * @apiSuccess (200) {Number} heightAboveSeaLevel 
     * @apiSuccess (200) {String} hlugurl url to hlug-website
     * @apiSuccess (200) {Array} images of the lake 
     * @apiSuccess (200) {String} introtext description
     * @apiSuccess (200) {String} lakeType
     * @apiSuccess (200) {Number} latitude
     * @apiSuccess (200) {Number} longitude
     * @apiSuccess (200) {Array} measurements of bacteria in the lake
     * @apiSuccess (200) {String} name name of the lake
     * @apiSuccess (200) {String} openFrom start date of the season NOT the opening hours 
     * @apiSuccess (200) {String} openTo end date of the season NOT the opening hours 
     * @apiSuccess (200) {Object} operator lake operator
     * @apiSuccess (200) {Array} yearratings ratings of the lake
     * @apiSuccess (200) {Object} downloads pdfs and other downloads
     * @apiSuccess (200) {Array} messages notifications
     * @apiSuccess (200) {String} bathingPermission
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200 OK
     *    {
     *        "__v": 0,
     *        "_id": "54e262e605e1723618de836e",
     *        "appropriateAuthority": [
     *        ],
     *        "areaHa": 6.7,
     *        "city": "Greifenstein",
     *        "depthAvg": 4.04,
     *        "depthMax": 11.4,
     *        "extracurricularActivity": "Angelsport,Baden",
     *        "heightAboveSeaLevel": 300,
     *        "hlugurl": "http://badeseen.hlug.de/badegewaesser/lahn-dill-kreis/ulmbachtalsperre.html",
     *        "images": [
     *            {
     *                 "copyright": "http://badeseen.hlug.de© HLUG",
     *                 "src": "http://badeseen.hlug.de/fileadmin/img_content/badeseen/Lahn-Dill-Kreis/Ulmbachtalsperre/Ulmbachtalsperre02.JPG"
     *            },
     *            {
     *                 "copyright": "http://badeseen.hlug.de© HLUG",
     *                 "src": "http://badeseen.hlug.de/fileadmin/img_content/badeseen/Lahn-Dill-Kreis/Ulmbachtalsperre/Ulmbachtalsperre01_T.JPG"
     *            }
     *        ],
     *        "introtext": "12 km südwestlich von Herborn liegt der fast 7 ha große Stausee. Umgeben von Wiesen dient er dem Hochwasserschutz. Im Badebereich ist das Ufer flach, sonst steil und bewachsen.",
     *        "lakeType": "Talsprerre",
     *        "latitude": 50.6024,
     *        "longitude": 8.2685,
     *        "measurements": [
     *            {
     *                "comment": "",
     *                "date": "2014-08-17T22:00:00.000Z",
     *                "enterocsocci": "10",
     *                "escherichiaColi": "21",
     *                "rating": 1,
     *                "waterTemperature": 17
     *            },
     *            {
     *                "comment": "",
     *                "date": "2014-07-20T22:00:00.000Z",
     *                "enterocsocci": "10",
     *                "escherichiaColi": "10",
     *                "rating": 1,
     *                "waterTemperature": 23
     *            }
     *        ],
     *        "name": "Ulmbachtalsperre",
     *        "openFrom": "2014-05-18T22:00:00.000Z",
     *        "openTo": "2014-08-31T22:00:00.000Z",
     *        "operator": [
     *        ],
     *        "yearratings": [
     *            {
     *                "rating": null,
     *                "year": "2012"
     *            },
     *            {
     *                "rating": 1,
     *                "year": "2013"
     *            }
     *        ]
     *    }
     *
     * @apiError (422) NoValidID ID is not valid
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 422 Unprocessable Entity
     *     {
     *         "error": "NoValidID"
     *     }
     *
     * @apiUse LakeNotFoundError
     */
    app.get('/api/v1/lakes/:id', function(req, res, next) {
        crud.retrieveLake({
            '_id': req.params.id
        }, function(err, doc) {
            if (err) {
                if (err.name === "CastError" && err.type === "ObjectId") {
                    res.statusCode = 422;
                    res.json({
                        "error": "NoValidID"
                    });
                } else {
                    res.statusCode = 500;
                    res.json({
                        "error": err
                    });
                }

                next(err);
            }

            if (doc === null) {
                res.statusCode = 404;
                res.json({
                    "error": "LakeNotFound"
                });
            } else {
                res.statusCode = 200;
                res.json(doc);
            }
        });
    });

    /**
     * @api {get} /lake/:id/measurements Get lake measurements
     * @apiName GetLakeMeasurements
     * @apiGroup Lakes
     *
     * @apiParam {String} id unique lake id
     *
     * @apiSuccess (200) {Array} measurements of bacteria in the lake
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200 OK
     *    {
     *        "measurements":
     *        [
     *            {
     *                "comment": "",
     *                "rating": 1,
     *                "escherichiaColi": "15",
     *                "enterocsocci": "15",
     *                "waterTemperature": 20,
     *                "date": "2014-08-18T22:00:00.000Z"
     *               }, {
     *                   "comment": "",
     *                   "rating": 1,
     *                   "escherichiaColi": "<15",
     *                   "enterocsocci": "<15",
     *                   "waterTemperature": 24,
     *                   "date": "2014-08-04T22:00:00.000Z"
     *            }
     *        ]
     *    }
     *
     * @apiUse LakeNotFoundError
     */
    app.get('/api/v1/lakes/:id/measurements', function(req, res, next) {
        crud.retrieveLake({
            '_id': req.params.id
        }, function(err, doc) {
            if (err) {
                if (err.name === "CastError" && err.type === "ObjectId") {
                    res.statusCode = 422;
                    res.json({
                        "error": "NoValidID"
                    });
                } else {
                    res.statusCode = 500;
                    res.json({
                        "error": err
                    });
                }

                next(err);
            }

            if (doc === null) {
                res.statusCode = 404;
                res.json({
                    "error": "LakeNotFound"
                });
            } else {
                res.statusCode = 200;
                res.json({
                    'measurements': doc.measurements
                });
            }
        });
    });
})();
