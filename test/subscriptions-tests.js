"use strict";

var assert = require('assert'),
    _und = require('underscore'),
    subscriptionssFixtures = require('../fixture/subscriptions'),
    subscriptionsController = require('../app/controllers/subscriptions');


describe('subscriptions', function() {
    before(function(cb) {
        cb();
    });

    beforeEach(function(cb) {
        cb();
    });

    afterEach(function(cb) {
        cb();
    });

    after(function(cb) {
        cb();
    });

    describe('#insertSubscription()', function() {
        it('inserts a subscription', function(cb) {
            var subscription = subscriptionsFixtures[0];
            subscriptionsController.insertSubscription(subscription, function(err, insertedSubscription){
                assert.ifError(err);
                assert.ok( subscription.displayName === insertedSubscription.displayName, 'inserted contact displayName matches intended text' );
                assert.ok( insertedSubscription.id, 'inserted subscription has an assigned id');
                cb();
            });
        });
    });

    describe('#deleteSubscription()', function() {
        it('deletes a subscription', function(cb) {

            cb();
        });
    });

    describe('#getNotificationCallback()', function() {
        it('', function(cb) {

            cb();
        });
    });

});
