(function() {
    'use strict';

    /* global require */
    var mongoose = require('mongoose'),
        Lake = require('../models/lake').Lake,
        should = require('chai').should,
        assert = require('chai').assert,
        crud = require('../api/v1/lakes/crud');

    before(function() {
        mongoose.connect(process.env.MONGODB_URI || 'localhost:27017/badeseen');

        /* Mongoose disconnection on app termination */
        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('Mongoose is disconnecting due to app termination');
                process.exit(0);
            });
        });
    });

    describe('insert, change and delete a test lake', function() {
        var testLake = {
            name: 'testlake'
        };

        it('should insert a lake', function(done) {
            crud.createLake(testLake, function(err) {
                if (err) throw err;
                else done();
            });
        });

        it('should update the lake data', function(done) {
            var oldName = testLake.name;
            testLake.name = 'itworks';

            crud.updateLake({
                'name': oldName
            }, {
                'name': testLake.name
            }, function(err, doc) {
                if (err) throw err;
                else {
                    assert.notEqual(doc, null, 'returned document should not be null');
                    assert.equal(doc.name, testLake.name);
                    done();
                }
            });
        });

        it('should retrieve the lake information', function(done) {
            crud.retrieveLake({
                'name': testLake.name
            }, function(err, doc) {
                if (err) throw err;
                else {
                    assert.notEqual(doc, null, 'returned document should not be null');
                    assert.equal(doc.name, testLake.name);
                    done();
                }
            });
        });

        it('should remove the lake', function(done) {
            crud.deleteLake({
                'local.name': testLake.name
            }, function(err, doc) {
                if (err) throw err;

                assert.equal(err, null);
                done();
            });
        });
    });

    after(function() {
        mongoose.connection.close();
    });
})();
