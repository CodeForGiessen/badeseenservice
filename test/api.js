var request = require('supertest'),
    express = require('express'),
    assert = require('chai').assert;

var app = require('../').app;

describe('GET /api/v1', function() {
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
