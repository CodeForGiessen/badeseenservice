(function() {
    'use strict';

    /* global require */
    var request = require('supertest'),
        express = require('express'),
        assert = require('chai').assert,
        isObjectID = require('../api/v1/lakes/crud').isObjectID;

    var app = require('../').app;

    describe('GET /api/v1/lakes', function() {
        it('should return entry point with self reference and lake reference', function(done) {
            request(app)
                .get('/api/v1/')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else {
                        var doc = res.body;

                        assert.notEqual(doc, null, 'returned document should not be null');
                        assert.equal(doc._links.self.href, '/');
                        assert.equal(doc._links.lakes.href, '/lakes');
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
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return status 404', function(done) {
            request(app)
                .get('/api/v1/lakes/000000000000000000000000')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return status 200', function(done) {
            request(app).get('/api/v1/lakes').end(function(err, res) {
                var firstLake = res.body._links[0];
                var objectID = null;

                // first we have to find a lake to test against
                for (var key in firstLake) {
                    if (firstLake.hasOwnProperty(key)) {
                        objectID = key;
                    }
                }

                if (objectID === null) {
                    throw new Error('no lake to test against. maybe the database is empty?');
                }

                request(app)
                    .get('/api/v1/lakes/' + objectID)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);

                        var doc = res.body;

                        assert.notEqual(doc, null, "returned document should not be null");
                        assert.ok(doc._id);
                        done();
                    });
            });
        });
    });
})();
