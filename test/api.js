(function() {
    'use strict';

    /* global require */
    var request = require('supertest'),
        express = require('express'),
        assert = require('chai').assert,
        crud = require('../api/v1/lakes/crud');

    var testLakeObject = {
        "name": "Erlensee",
        "hlugurl": "http://badeseen.hlug.de/badegewaesser/darmstadt-dieburg/erlensee.html",
        "latitude": 49.7696,
        "longitude": 8.5875,
        "openFrom": "2014-05-14T22:00:00.000Z",
        "openTo": "2014-09-14T22:00:00.000Z",
        "introtext": "Die Kiesbagger hinterließen hier eine 13 ha große Wasserfläche. Der See ist von leicht grünlicher Farbe, dient als Fischgewässer und ist als Vogelschutzgebiet ausgewiesen. Der See ist vom Ufer her überall zugänglich und besitzt am westlichen Ufer einen Badestrand.",
        "city": "Bickenbach",
        "heightAboveSeaLevel": 92,
        "areaHa": 13,
        "depthMax": 15.41,
        "depthAvg": 6.02,
        "lakeType": "Baggersee",
        "extracurricularActivity": "Angelsport,Baden",
        "__v": 0,
        "appropriateAuthority": [],
        "operator": [],
        "images": [{
            "src": "http://badeseen.hlug.de/fileadmin/img_content/badeseen/Darmstadt-Dieburg/Erlensee/Erlensee_Bickenbach03.JPG",
            "copyright": "http://badeseen.hlug.de© HLUG"
        }, {
            "src": "http://badeseen.hlug.de/fileadmin/img_content/badeseen/Darmstadt-Dieburg/Erlensee/Erlensee_Bickenbach02.JPG",
            "copyright": "http://badeseen.hlug.de© HLUG"
        }, {
            "src": "http://badeseen.hlug.de/fileadmin/img_content/badeseen/Darmstadt-Dieburg/Erlensee/Erlensee_Bickenbach01_T.JPG",
            "copyright": "http://badeseen.hlug.de© HLUG"
        }],
        "yearratings": [{
            "year": "2011",
            "rating": 1
        }, {
            "year": "2012",
            "rating": 1
        }, {
            "year": "2013",
            "rating": 1
        }],
        "measurements": [{
            "date": "2014-08-25T22:00:00.000Z",
            "waterTemperature": 18,
            "enterocsocci": "30",
            "escherichiaColi": "61",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2014-07-28T22:00:00.000Z",
            "waterTemperature": 25,
            "enterocsocci": "<15",
            "escherichiaColi": "45",
            "rating": 1,
            "comment": "Sichttiefe >2m"
        }, {
            "date": "2014-06-30T22:00:00.000Z",
            "waterTemperature": 21,
            "enterocsocci": "<15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": "Sichttiefe >2m"
        }, {
            "date": "2014-06-02T22:00:00.000Z",
            "waterTemperature": 20,
            "enterocsocci": "<15",
            "escherichiaColi": "144",
            "rating": 1,
            "comment": "Sichttiefe >2m"
        }, {
            "date": "2014-05-05T22:00:00.000Z",
            "waterTemperature": 16,
            "enterocsocci": "<15",
            "escherichiaColi": "46",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2013-08-19T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "15",
            "escherichiaColi": "<15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2013-07-29T22:00:00.000Z",
            "waterTemperature": 25,
            "enterocsocci": "15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2013-07-01T22:00:00.000Z",
            "waterTemperature": 21,
            "enterocsocci": "<15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2013-06-03T22:00:00.000Z",
            "waterTemperature": 17,
            "enterocsocci": "<15",
            "escherichiaColi": "<15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2013-05-06T22:00:00.000Z",
            "waterTemperature": 17,
            "enterocsocci": "<15",
            "escherichiaColi": "<15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2012-08-20T22:00:00.000Z",
            "waterTemperature": 27,
            "enterocsocci": "<15",
            "escherichiaColi": "46",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2012-07-30T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "<15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2012-07-02T22:00:00.000Z",
            "waterTemperature": 25,
            "enterocsocci": "<15",
            "escherichiaColi": "251",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2012-06-04T22:00:00.000Z",
            "waterTemperature": 20,
            "enterocsocci": "<15",
            "escherichiaColi": "126",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2012-05-07T22:00:00.000Z",
            "waterTemperature": 18,
            "enterocsocci": "15",
            "escherichiaColi": "<15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2011-08-22T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "15",
            "escherichiaColi": "30",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2011-08-01T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "<15",
            "escherichiaColi": "126",
            "rating": 2,
            "comment": ""
        }, {
            "date": "2011-07-04T22:00:00.000Z",
            "waterTemperature": 26,
            "enterocsocci": "<15",
            "escherichiaColi": "<15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2011-06-06T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "30",
            "escherichiaColi": "61",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2011-05-09T22:00:00.000Z",
            "waterTemperature": 21,
            "enterocsocci": "<15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2010-08-23T22:00:00.000Z",
            "waterTemperature": 22,
            "enterocsocci": "61",
            "escherichiaColi": "30",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2010-08-01T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "127",
            "escherichiaColi": "350",
            "rating": 2,
            "comment": ""
        }, {
            "date": "2010-07-04T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "15",
            "escherichiaColi": "93",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2010-06-07T22:00:00.000Z",
            "waterTemperature": 23,
            "enterocsocci": "15",
            "escherichiaColi": "15",
            "rating": 1,
            "comment": ""
        }, {
            "date": "2010-05-09T22:00:00.000Z",
            "waterTemperature": 17,
            "enterocsocci": "15",
            "escherichiaColi": "127",
            "rating": 2,
            "comment": ""
        }, {
            "date": "2009-08-31T22:00:00.000Z",
            "waterTemperature": 25,
            "enterocsocci": "30",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2009-08-03T22:00:00.000Z",
            "waterTemperature": 24,
            "enterocsocci": "10",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2009-07-07T22:00:00.000Z",
            "waterTemperature": 23,
            "enterocsocci": "10",
            "escherichiaColi": "77",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2009-06-09T22:00:00.000Z",
            "waterTemperature": 20,
            "enterocsocci": "30",
            "escherichiaColi": "30",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2009-05-11T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "48",
            "escherichiaColi": "30",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2008-08-26T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "10",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2008-07-29T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "18",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2008-07-01T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "27",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2008-06-03T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "500",
            "escherichiaColi": "1701",
            "rating": 0,
            "comment": ""
        }, {
            "date": "2008-05-06T22:00:00.000Z",
            "waterTemperature": null,
            "enterocsocci": "14",
            "escherichiaColi": "15",
            "rating": 0,
            "comment": ""
        }]
    };

    var app = require('../').app,
        isObjectID = crud.isObjectID;

    var testLakeId = null,
        testLake = null;

    before(function(done) {
        crud.createLake(testLakeObject, function(err, doc) {
            if (!err) {
                testLake = doc;
                testLakeId = doc._id;
            }

            done(err);
        });
    });

    describe('GET /api/v1', function() {
        it('should return entry point with self reference and lake reference', function(done) {
            request(app)
                .get('/api/')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.equal(doc._links.self.href, '/api/');
                        assert.equal(doc._links.v1.href, '/api/v1');

                        done();
                    }
                });
        });
    });

    describe('GET /api/v1/lakes', function() {
        it('should return entry point with self reference and lake reference', function(done) {
            request(app)
                .get('/api/v1/lakes')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.ok(doc._links);

                        done();
                    }
                });
        });
    });

    describe('GET /api/v1/lakes/all', function() {
        var allLakeIds;

        before(function(done) {
            crud.getAllObjectIDs(function(err, ids) {
                if (err) return done(err);
                else {
                    allLakeIds = ids.map(function(id) {
                        return id.toString();
                    });

                    done();
                }
            });
        });

        it('should return all lakes', function(done) {
            request(app)
                .get('/api/v1/lakes/all')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body,
                            ids = null;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.ok(doc._links);
                        assert.ok(doc.lakes);

                        ids = doc.lakes.map(function(doc) {
                            return doc._id;
                        });

                        assert.deepEqual(allLakeIds, ids);
                        done();
                    }
                });
        });
    });

    describe('GET /api/v1/lakes/allweather', function() {
        var allLakeIds;

        before(function(done) {
            crud.getAllObjectIDs(function(err, ids) {
                if (err) return done(err);
                else {
                    allLakeIds = ids.map(function(id) {
                        return id.toString();
                    });

                    done();
                }
            });
        });

        it('should return weatherdata for all lakes', function(done) {
            request(app)
                .get('/api/v1/lakes/allweather')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body,
                            ids = null;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.ok(doc._links);
                        assert.ok(doc.weatherdatas);

                        ids = Object.keys(doc.weatherdatas);
                        assert.deepEqual(allLakeIds, ids);

                        done();
                    }
                });
        });
    });

    describe('GET /api/v1/lakes/allmessages', function() {
        var allLakeIds;

        before(function(done) {
            crud.getAllObjectIDs(function(err, ids) {
                if (err) return done(err);
                else {
                    allLakeIds = ids.map(function(id) {
                        return id.toString();
                    });

                    done();
                }
            });
        });

        it('should return weatherdata for all lakes', function(done) {
            request(app)
                .get('/api/v1/lakes/allmessages')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body,
                            ids = null;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.ok(doc._links);
                        assert.ok(doc.messages);

                        ids = Object.keys(doc.messages);
                        assert.deepEqual(allLakeIds, ids);

                        done();
                    }
                });
        });
    });

    describe('GET /api/v1/lakes/:id', function() {
        it('should return status 422', function(done) {
            request(app)
                .get('/api/v1/lakes/thisisnoid')
                .expect(422)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 404', function(done) {
            request(app)
                .get('/api/v1/lakes/000000000000000000000000')
                .expect(404)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 200', function(done) {
            request(app).get('/api/v1/lakes').end(function(err, res) {
                request(app)
                    .get('/api/v1/lakes/' + testLakeId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);

                        var doc = res.body;

                        assert.notEqual(doc, null, "returned document should not be null");
                        assert.equal(doc._id, testLakeId, "ids should equal");
                        done();
                    });
            });
        });
    });

    describe('GET /api/v1/lakes/:id/measurements', function() {
        it('should return status 422', function(done) {
            request(app)
                .get('/api/v1/lakes/thisisnoid/measurements')
                .expect(422)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 404', function(done) {
            request(app)
                .get('/api/v1/lakes/000000000000000000000000/measurements')
                .expect(404)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 200', function(done) {
            request(app)
                .get('/api/v1/lakes/' + testLakeId + '/measurements')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    var doc = res.body;

                    assert.notEqual(doc, null, "returned document should not be null");
                    assert.ok(doc.measurements);
                    done();
                });
        });
    });
    describe('GET /api/v1/lakes/:id/weather', function() {
        it('should return status 422', function(done) {
            request(app)
                .get('/api/v1/lakes/thisisnoid/weather')
                .expect(422)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 404', function(done) {
            request(app)
                .get('/api/v1/lakes/000000000000000000000000/weather')
                .expect(404)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 200', function(done) {
            request(app)
                .get('/api/v1/lakes/' + testLakeId + '/weather')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    var doc = res.body;

                    assert.notEqual(doc, null, "returned document should not be null");
                    assert.ok(doc.weather);
                    done();
                });
        });
    });
    describe('GET /api/v1/lakes/:id/messages', function() {
        it('should return status 422', function(done) {
            request(app)
                .get('/api/v1/lakes/thisisnoid/messages')
                .expect(422)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 404', function(done) {
            request(app)
                .get('/api/v1/lakes/000000000000000000000000/messages')
                .expect(404)
                .end(function(err) {
                    done(err);
                });
        });

        it('should return status 200', function(done) {
            request(app)
                .get('/api/v1/lakes/' + testLakeId + '/messages')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    var doc = res.body;

                    assert.notEqual(doc, null, "returned document should not be null");
                    assert.ok(doc.messages);
                    done();
                });
        });
    });

    after(function(done) {
        crud.deleteLake({
            '_id': testLakeId
        }, function(err) {
            done(err);
        });
    });
})();
