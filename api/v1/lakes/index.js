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
     * @apiSuccess (200) {String} _id lake identifier
     * @apiSuccess (200) {String} name name of the lake
     * @apiSuccess (200) {Object} appropriateAuthority responsible authority for the lake
     * @apiSuccess (200) {Number} areaHa size of the lake
     * @apiSuccess (200) {String} city nearby city
     * @apiSuccess (200) {Number} depthAvg average depth
     * @apiSuccess (200) {Number} depthMax maximal depth
     * @apiSuccess (200) {Array}  extracurricularActivity activities
     * @apiSuccess (200) {Number} heightAboveSeaLevel
     * @apiSuccess (200) {String} hlugurl url to hlug-website
     * @apiSuccess (200) {Array}  images of the lake
     * @apiSuccess (200) {String} introtext description
     * @apiSuccess (200) {String} lakeType type of lake
     * @apiSuccess (200) {Number} latitude latitude of position
     * @apiSuccess (200) {Number} longitude longitude of position
     * @apiSuccess (200) {String} name name of the lake
     * @apiSuccess (200) {String} openFrom start date of the season NOT the opening hours
     * @apiSuccess (200) {String} openTo end date of the season NOT the opening hours
     * @apiSuccess (200) {Object} operator lake operator
     * @apiSuccess (200) {Array}  yearratings ratings of the lake
     * @apiSuccess (200) {Object} downloads pdfs and other downloads
     * @apiSuccess (200) {String} bathingPermission permission of bathing at the moment
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200 OK
     *    {
     *        "_id": "54e88e163aa8ccc41e1ab839",
     *        "name": "Marbach-Stausee",
     *        "hlugurl": "http://badeseen.hlug.de/badegewaesser/odenwaldkreis/marbach-stausee.html",
     *        "latitude": 49.6089,
     *        "longitude": 8.9677,
     *        "openFrom": "2014-06-30T22:00:00.000Z",
     *        "openTo": "2014-08-30T22:00:00.000Z",
     *        "bathingPermission": "keine Badesaison",
     *        "introtext": "Der Bereich hinter dem Staudamm (abzügl. einer Sicherheitszone) ist für Surfer und Segelboote reserviert. Daran angrenzend befindet sich der Bade- und Vergnügungsbereich. Im hinteren Teil des Sees befindet sich der Vogelschutzbereich mit einer kleinen Insel. Dieser Bereich darf nicht betreten und nicht mit Booten befahren werden. Um den See führt ein drei Kilometer langer Wanderweg. ",
     *        "city": "Beerfelden",
     *        "heightAboveSeaLevel": 250,
     *        "areaHa": 22,
     *        "depthMax": 8.6,
     *        "depthAvg": 3.21,
     *        "lakeType": "Talsprerre",
     *        "downloads": {
     *            "generalInformation":"http://badeseen.hlug.de/fileadmin/dokumente/badeseen/Odenwaldkreis/Marbach-Stausee/DEHE_PR_0046_Text_Marbachtalsperre_120401.pdf",
     *            "landUseMap":"http://badeseen.hlug.de/fileadmin/dokumente/badeseen/Odenwaldkreis/Marbach-Stausee/DEHE_PR_0046_Karte_Marbach Stausee.pdf",
     *            "bathymetricChart":null
     *        },
     *        "messages": [],
     *        "appropriateAuthority":{
     *            "telephone":"06062 70-0",
     *            "zipcodeCity":"64711 Erbach",
     *            "street":"Michelstädter Str. 12",
     *            "addressAdditional":"Kreisgesundheitsamt",
     *            "address":"Odenwaldkreis",
     *            "name":"Gesundheitsamt Odenwaldkreis"
     *        },
     *        "operator": {
     *            "website": "",
     *            "fax": "06062/ 70 287",
     *            "telephone": "06062/ 70 288",
     *            "email": "m.sottong@wv-muemling-gersprenz.de",
     *            "zipcodeCity": "64711 Erbach",
     *            "street": "Michelstädter Straße 12",
     *            "name": "Wasserverband Mümling Landratsamt Odenwaldkreis"
     *        },
     *        "images":[
     *            {
     *                "copyright":"http://badeseen.hlug.de© HLUG",
     *                "src":"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre03.JPG",
     *                "_id":"54e9dc7ec6ad161e1ca26bc1"
     *            },
     *            {
     *               "copyright":"http://badeseen.hlug.de© HLUG",
     *               "src":"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre02.JPG",
     *               "_id":"54e9dc7ec6ad161e1ca26bc0"
     *           },
     *           {
     *               "copyright":"http://badeseen.hlug.de© HLUG",
     *               "src":"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre01_T.JPG",
     *               "_id":"54e9dc7ec6ad161e1ca26bbf"
     *           }
     *       ],
     *       "yearratings":[
     *           {
     *               "rating":1,
     *               "year":"2011",
     *               "_id":"54e9dc7ec6ad161e1ca26bc4"
     *           },
     *           {
     *               "rating":1,
     *               "year":"2012",
     *               "_id":"54e9dc7ec6ad161e1ca26bc3"
     *           },
     *           {
     *               "rating":1,
     *               "year":"2013",
     *               "_id":"54e9dc7ec6ad161e1ca26bc2"
     *           }
     *       ],
     *       "extracurricularActivity":[
     *           "ANGELSPORT",
     *           "BADEN",
     *           "SEGELN",
     *           "WINDSURFEN"
     *       ]
     *   }
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
        crud.retrieveLakeBaseData({
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
